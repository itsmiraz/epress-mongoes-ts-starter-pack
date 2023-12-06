import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Admin } from './admin.model';
import { TAdmin } from './admin.interface';

const getAllAdminsFromDb = async (query: Record<string, unknown>) => {
  const adminSearchAbleFeils = ['email', 'name.firstName', 'presentAddress'];
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(adminSearchAbleFeils)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;

  return result;
};

const getSingleAdminFromDb = async (id: string) => {
  const result = await Admin.findOne({ id });

  return result;
};
const deleteAdminFromDb = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteFaculty = await Admin.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      { new: true, session },
    );

    if (!deleteFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
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

const updateAdminFromDb = async (id: string, data: Partial<TAdmin>) => {
  const { name, ...remainingStudentData } = data;

  const modifiedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findOneAndUpdate({ id: id }, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const AdminServices = {
  getAllAdminsFromDb,
  getSingleAdminFromDb,
  deleteAdminFromDb,
  updateAdminFromDb,
};
