import { Student } from './student.model';
import { TStuedent } from './student.interface';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearcableFiels } from './student.constant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearcableFiels)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;

  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });

  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};
const delteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failded to delete student');
  }
};

const updateLocalGuardianData = async (
  id: string,
  data: Partial<TStuedent>,
) => {
  const student = Student.isUserExists(id);

  if (!student) {
    throw new Error('Student Does not Exists');
  }

  const { name, Guardian, localGuardian, ...remainingStudentData } = data;

  const modifiedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  if (Guardian && Object.keys(Guardian).length) {
    for (const [key, value] of Object.entries(Guardian)) {
      modifiedData[`Guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id: id }, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDb,
  delteStudentFromDb,
  updateLocalGuardianData,
};
