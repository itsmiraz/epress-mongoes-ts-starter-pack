import { SemisterRegistration } from './semisterRegistration.model';
import { TSemisterRegistration } from './semisterRegistration.interface';
import { AcademicSemister } from '../academicSemister/academicSemister.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semisterRegistration.constants';

const createsemisterRegistrationIntoDB = async (
  payload: TSemisterRegistration,
) => {
  const academicSemester = payload?.academicSemester;
  // Check if the semister is exists
  const isAcademicSemisterExists =
    await AcademicSemister.findById(academicSemester);
  if (!isAcademicSemisterExists) {
    throw new AppError(404, 'Academic Semister Does not Exits');
  }

  const isSemisterRegistrationExits = await SemisterRegistration.findOne({
    academicSemester,
  });
  if (isSemisterRegistrationExits) {
    throw new AppError(httpStatus.CONFLICT, 'This Semister is Already Exists');
  }

  const isThereAnyUpcomingOrOngoingSemester =
    await SemisterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} registered semester!`,
    );
  }

  const result = await SemisterRegistration.create(payload);
  return result;
};

const getAllsemisterRegistrationsFromDb = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemisterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  const meta = await semesterRegistrationQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSinglesemisterRegistrationFromDb = async (id: string) => {
  const result = await SemisterRegistration.findById(id);

  return result;
};

const updatesemisterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemisterRegistration>,
) => {
  //IF the requested semester registration is ended we will not uodate anything
  const reqestedSemester = await SemisterRegistration.findById(id);
  if (!reqestedSemester) {
    throw new AppError(httpStatus.NOT_FOUND, ' Semester Not Found');
  }

  const currentSemesterStatus = reqestedSemester.status;
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This Semister is Already Ended!',
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    payload?.status === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You Can not directly change status from Upcoming to Ended',
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    payload?.status === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You Can not directly change status from Ongoing to Upcoming',
    );
  }

  const result = await SemisterRegistration.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      runValidators: true,
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
