import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemister } from '../academicSemister/academicSemister.model';
import { TStuedent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentintoDb = async (password: string, payload: TStuedent) => {
  const userData: Partial<TUser> = {};

  // if passoword is not gived , use default password

  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemister = await AcademicSemister.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Automatically generated Id
    userData.id = await generateStudentId(admissionSemister);

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

    // Transaction 2
    const newStudent = await Student.create([payload], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failded to create Student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to create user');
  }
};

export const UserServices = {
  createStudentintoDb,
};
