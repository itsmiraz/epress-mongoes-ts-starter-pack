import { SemisterRegistration } from './semisterRegistration.model';
import { TSemisterRegistration } from './semisterRegistration.interface';
import { AcademicSemister } from '../academicSemister/academicSemister.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createsemisterRegistrationIntoDB = async (
  payload: TSemisterRegistration,
) => {
  const academicSemester = payload?.academicSemister;

  // Check if the semister is exists
  const isAcademicSemisterExists =
    await AcademicSemister.findById(academicSemester);
  if (!isAcademicSemisterExists) {
    throw new AppError(404, 'Academic Semister Does not Exits');
  }

  const isSemisterRegistrationExits = await SemisterRegistration.findOne({
    academicSemester,
  });
  if (!isSemisterRegistrationExits) {
    throw new AppError(httpStatus.CONFLICT, 'This Semister is Already Exists');
  }

  const result = await SemisterRegistration.create(payload);

  return result;
};

const getAllsemisterRegistrationsFromDb = async () => {
  const result = ''; // Your Business Logic
  return result;
};

const getSinglesemisterRegistrationFromDb = async (id: string) => {
  const result = await SemisterRegistration.findById(id);

  return result;
};

const updatesemisterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemisterRegistration>,
) => {
  const result = await SemisterRegistration.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

const deletesemisterRegistrationIntoDB = async (id: string) => {
  const result = await SemisterRegistration.findByIdAndDelete(id);
  return result;
};

export const semisterRegistrationServices = {
  createsemisterRegistrationIntoDB,
  getAllsemisterRegistrationsFromDb,
  getSinglesemisterRegistrationFromDb,
  updatesemisterRegistrationIntoDB,
  deletesemisterRegistrationIntoDB,
};
