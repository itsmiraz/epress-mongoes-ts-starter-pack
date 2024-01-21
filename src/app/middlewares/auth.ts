import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
    }
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
    }

    const { role, userId, iat } = decoded;

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
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not Authorized');
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized -');
    }
    req.user = decoded;
    next();
  });
};

export default auth;
