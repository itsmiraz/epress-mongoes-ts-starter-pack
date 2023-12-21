import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './Auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcryptjs';
import { createToken } from './Auth.utils';
import jwt from 'jsonwebtoken';
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

export const AuthServices = {
  loginUser,
  changePasswordIntoDb,
  refreshToken,
};
