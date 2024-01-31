import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './Auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcryptjs';
import { createToken, verifyToken } from './Auth.utils';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail';
const loginUser = async (payload: TLoginUser) => {
  const isUserExists = await User.isUserExistsWithCustomId(payload.id);
  if (!isUserExists) {
    throw new AppError(404, 'User Not Found');
  }

  const isUserDeleted = isUserExists.isDeleted;

  if (isUserDeleted) {
    throw new AppError(400, 'User has been Deleted');
  }

  const UserStatus = isUserExists.status;

  if (UserStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User has been Blocked');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    isUserExists.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect Password');
  }

  const jwtPayload = {
    userId: isUserExists.id,
    role: isUserExists.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExists.needsPasswordChanged,
  };
};

const changePasswordIntoDb = async (
  user: JwtPayload,
  payload: { oldPassword: string; password: string },
) => {
  const isUserExists = await User.isUserExistsWithCustomId(user.userId);
  if (!isUserExists) {
    throw new AppError(404, 'User Not Found');
  }

  const isUserDeleted = isUserExists.isDeleted;

  if (isUserDeleted) {
    throw new AppError(400, 'User has been Deleted');
  }

  const UserStatus = isUserExists.status;

  if (UserStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User has been Blocked');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.oldPassword,
    isUserExists.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect Password');
  }

  // hash new Pass
  const newHashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_round),
  );

  await User.findOneAndUpdate(
    {
      id: user.userId,
      role: user.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChanged: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  if (!decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
  }

  const { userId, iat } = decoded;
  const user = await User.isUserExistsWithCustomId(userId);
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }

  const isUserDeleted = user.isDeleted;

  if (isUserDeleted) {
    throw new AppError(400, 'User has been Deleted');
  }

  const UserStatus = user.status;

  if (UserStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User has been Blocked');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not Authorized');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (id: string) => {
  const user = await User.isUserExistsWithCustomId(id);
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }

  const isUserDeleted = user.isDeleted;

  if (isUserDeleted) {
    throw new AppError(400, 'User has been Deleted');
  }

  const UserStatus = user.status;

  if (UserStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User has been Blocked');
  }
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10min',
  );

  const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${accessToken}`;
  console.log(accessToken);
  const body = `
  <div class="container">
  <h2>Password Reset</h2>
  <p>Hello There,</p>
  <p>We received a request to reset your password. Click the button below to reset it:</p>
  <a class="btn" href=${resetUILink}>Reset Password</a>
  <p>If you didn't request a password reset, please ignore this email.</p>
  <p>Thank you,</p>
  <p>The PH Team</p>
</div>`;

  await sendEmail(user.email, 'Reset Your Password with In 10 min', body);
};

const resetPassoword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExistsWithCustomId(payload.id);
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }

  const isUserDeleted = user.isDeleted;

  if (isUserDeleted) {
    throw new AppError(400, 'User has been Deleted');
  }

  const UserStatus = user.status;

  if (UserStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User has been Blocked');
  }
  const decoded = verifyToken(token, config.jwt_access_secret as string);
  if (decoded.userId !== payload.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden');
  }

  // hash new Pass
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );

  await User.findOneAndUpdate(
    {
      id: payload.id,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChanged: false,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};

// http://localhost:3000/?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDMzMDQ2MDksImV4cCI6MTcwMzMwNTIwOX0.4tBTbGiytwnXP3f-cMxRROBtNedcL_jj8OS6ysT52lE

// http://localhost:3000/?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDMzMDQ2MDksImV4cCI6MTcwMzMwNTIwOX0.4tBTbGiytwnXP3f-cMxRROBtNedcL_jj8OS6ysT52lE

export const AuthServices = {
  loginUser,
  changePasswordIntoDb,
  refreshToken,
  forgetPassword,
  resetPassoword,
};
