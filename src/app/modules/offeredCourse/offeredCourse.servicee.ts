import { OfferedCourse } from './offeredCourse.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { SemisterRegistration } from '../semisterRegistration/semisterRegistration.model';
import AppError from '../../errors/AppError';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import httpStatus from 'http-status';
import { hasTimeConflict } from './offeredCourse.utils';

const createofferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemisterRegistrationExists =
    await SemisterRegistration.findById(semesterRegistration);

  if (!isSemisterRegistrationExists) {
    throw new AppError(404, 'Semister Registeration not Found!');
  }

  const academicSemister = isSemisterRegistrationExists.academicSemester;

  const isacademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isacademicFacultyExists) {
    throw new AppError(404, 'Academic Facultu not Found!');
  }
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(404, 'Academic Department not Found!');
  }
  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(404, 'Course not Found!');
  }
  const isfacultyExists = await Faculty.findById(faculty);

  if (!isfacultyExists) {
    throw new AppError(404, 'Faculty not Found!');
  }

  // check the department is belong to the faculty

  const isDepartmentBelongtoFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongtoFaculty) {
    throw new AppError(
      404,
      `This ${isAcademicDepartmentExists.name} is not belong to this ${isacademicFacultyExists.name}`,
    );
  }

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      400,
      `Offered Course with same section is Already Exists`,
    );
  }

  //get the schedules of the faculties

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This Faculty is not available at that time Choose Any Other time or day!`,
    );
  }

  const result = await OfferedCourse.create({
    ...payload,
    academicSemester: academicSemister,
  });

  return result;
};

const getAllofferedCoursesFromDb = async () => {
  const result = ''; // Your Business Logic
  return result;
};

const getSingleofferedCourseFromDb = async (id: string) => {
  const result = await OfferedCourse.findById(id);

  return result;
};

const updateofferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {
  const result = await OfferedCourse.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteofferedCourseIntoDB = async (id: string) => {
  const result = await OfferedCourse.findByIdAndDelete(id);
  return result;
};

export const offeredCourseServices = {
  createofferedCourseIntoDB,
  getAllofferedCoursesFromDb,
  getSingleofferedCourseFromDb,
  updateofferedCourseIntoDB,
  deleteofferedCourseIntoDB,
};
