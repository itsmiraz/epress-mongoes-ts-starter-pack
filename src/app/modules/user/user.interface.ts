/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.contstant';

export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChanged: boolean;
  role: 'admin' | 'student' | 'faculty';
  passwordChangedAt?: Date;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistsWithCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    HashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
