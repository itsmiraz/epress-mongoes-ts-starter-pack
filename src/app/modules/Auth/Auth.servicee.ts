import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './Auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcryptjs';

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

  const accessToken = jwt.sign(
    { jwtPayload },
    config.jwt_access_secret as string,
    {
      expiresIn: '10d',
    },
  );

  return {
    accessToken,
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
export const AuthServices = {
  loginUser,
  changePasswordIntoDb,
};
