import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './Auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

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

  const isPasswordMatched = User.isPasswordMatched(
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

export const AuthServices = {
  loginUser,
};
