/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemister } from '../academicSemister/academicSemister.model';
import { TStuedent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { Admin } from '../admin/admin.model';
import { JwtPayload } from 'jsonwebtoken';
import { SendImagesToCloudniary } from '../../utils/sendImagesToCloudinary';

const createStudentintoDb = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any,
  password: string,
  payload: TStuedent,
) => {
  const userData: Partial<TUser> = {};

  // if passoword is not gived , use default password

  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';
  userData.email = payload.email;

  // find academic semester info
  const admissionSemister = await AcademicSemister.findById(
    payload.admissionSemester,
  );
  if (!admissionSemister) {
    throw new AppError(404, 'Academic Semister Not Found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Automatically generated Id
    userData.id = await generateStudentId(admissionSemister);

    const imageName = `${userData.id}_${payload?.name?.firstName}_profile`;

    const profileImageData = await SendImagesToCloudniary(
      imageName,
      file?.path,
    );

    // Transaction 1
    // Create a new user
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create User');
    }
    // set id, _Id
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //referencing _ id
    payload.profile = (profileImageData as { secure_url: string }).secure_url;
    // Transaction 2
    const newStudent = await Student.create([payload], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failded to create Student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const createFcaultyintoDb = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  const userData: Partial<TUser> = {};

  // if passoword is not gived , use default password

  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'faculty';
  userData.email = payload.email;

  // find academic semester info
  // const admissionSemister = await AcademicSemister.findById(
  //   payload.admissionSemester,
  // );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Automatically generated Id
    userData.id = await generateFacultyId();

    const imageName = `${userData.id}_${payload?.name?.firstName}_profile`;

    const profileImageData = await SendImagesToCloudniary(
      imageName,
      file?.path,
    );

    // Transaction 1
    // Create a new user
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create User');
    }
    // set id, _Id
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //referencing _ id
    payload.profile = (profileImageData as { secure_url: string }).secure_url;

    // Transaction 2
    const newStudent = await Faculty.create([payload], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failded to create Faculty');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const createAdminIntoDb = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  const userData: Partial<TUser> = {};

  // if passoword is not gived , use default password

  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Automatically generated Id
    userData.id = await generateAdminId();
    const imageName = `${userData.id}_${payload?.name?.firstName}_profile`;

    const profileImageData = await SendImagesToCloudniary(
      imageName,
      file?.path,
    );
    // Transaction 1
    // Create a new user
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create User');
    }
    // set id, _Id
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //referencing _ id
    payload.profile = (profileImageData as { secure_url: string }).secure_url;

    // Transaction 2
    const newStudent = await Admin.create([payload], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failded to create Admin');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMeFromDb = async (payload: JwtPayload) => {
  const { userId, role } = payload;
  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const UserServices = {
  createStudentintoDb,
  createFcaultyintoDb,
  createAdminIntoDb,
  getMeFromDb,
  changeStatus,
};
