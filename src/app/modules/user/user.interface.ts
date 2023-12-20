/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChanged: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistsWithCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    HashedPassword: string,
  ): Promise<boolean>;
}
