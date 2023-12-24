import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Faculty } from './faculty.model';
import { TFaculty } from './faculty.interface';

const getAllFacultiesFromDb = async (query: Record<string, unknown>) => {
  const facultySearchAbleFeils = ['email', 'name.firstName', 'presentAddress'];
  const facalutyQuery = new QueryBuilder(Faculty.find(), query)
    .search(facultySearchAbleFeils)

    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facalutyQuery.modelQuery;

  return result;
};

const getSingleFacultyFromDb = async (id: string) => {
  const result = await Faculty.findById(id).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });

  return result;
};
const deleteFacultyFromDb = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteFaculty = await Faculty.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      { new: true, session },
    );

    if (!deleteFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Faculty');
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

    return deleteFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failded to delete Faculty');
  }
};

const updateFacultyFromDb = async (id: string, data: Partial<TFaculty>) => {
  //   const student = Student.isUserExists(id);

  //   if (!student) {
  //     throw new Error('Student Does not Exists');
  //   }

  const { name, ...remainingStudentData } = data;

  const modifiedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findOneAndUpdate({ id: id }, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const FacultyServices = {
  getAllFacultiesFromDb,
  getSingleFacultyFromDb,
  deleteFacultyFromDb,
  updateFacultyFromDb,
};
