import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { Student } from '../student/student.model';
import { TEnrolledCourse } from './EnrolledCourse.interface';
import EnrolledCourse from './EnrolledCourse.model';
import mongoose from 'mongoose';
import { SemisterRegistration } from '../semisterRegistration/semisterRegistration.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { calucalateGradeAndPoints } from './EnrolledCourse.utils';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  const { offeredCourse } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  const course = await Course.findById(isOfferedCourseExists?.course);

  if (!isOfferedCourseExists) {
    throw new AppError(404, 'Offered Course not  Found');
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'Room is Full');
  }

  const student = await Student.findOne({ id: userId }, { _id: 1 });

  if (!student) {
    throw new AppError(404, 'Student not  Found');
  }
  const isStudentAlreadyEnrolledCourse = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists.semesterRegistration,
    offeredCourse,
    student: student._id,
  });
  if (isStudentAlreadyEnrolledCourse) {
    throw new AppError(400, 'Student is Aready Enrolled');
  }

  // check total credits exceeds max credit
  const semesterRegistration = await SemisterRegistration.findById(
    isOfferedCourseExists.semesterRegistration,
  );

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;

  if (
    totalCredits &&
    semesterRegistration?.maxCredit &&
    totalCredits + course?.credits > semesterRegistration?.maxCredit
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You have exceeded the credit');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists?.semesterRegistration,
          academicSemester: isOfferedCourseExists?.academicSemester,
          academicFaculty: isOfferedCourseExists?.academicFaculty,
          academicDepartment: isOfferedCourseExists?.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists?.course,
          student: student._id,
          isEnrolled: true,
          faculty: isOfferedCourseExists?.faculty,
        },
      ],
      { session },
    );
    if (!result) {
      throw new AppError(400, 'Failded Enrolled to Enroll Course');
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const updateEnrollCourseMarksIntoDb = async (
  facultyID: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { offeredCourse, semesterRegistration, student, courseMarks } = payload;

  const isOfferedCourseExits = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course Not Found');
  }
  const issemesterRegistrationExists =
    await SemisterRegistration.findById(semesterRegistration);
  if (!issemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semister Registration  Not Found',
    );
  }
  const isStudentExits = await Student.findById(student);
  if (!isStudentExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student Not Found');
  }
  const faculty = await Faculty.findOne({ id: facultyID }, { _id: 1 });
  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty Not Found');
  }

  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty?._id,
  });

  if (!isCourseBelongToFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are Forbidden');
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  };

  if (courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm, finalTerm } =
      isCourseBelongToFaculty.courseMarks;

    const totalMarks =
      Math.ceil(classTest1 * 0.1) +
      Math.ceil(midTerm * 0.3) +
      Math.ceil(classTest2 * 0.1) +
      Math.ceil(finalTerm * 0.5);

    const result = calucalateGradeAndPoints(totalMarks);

    modifiedData.grade = result.grade;
    modifiedData.gradePoints = result.gradePoints;
    modifiedData.isCompleted = true;
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedData,
    {
      new: true,
    },
  );

  // Your Business Logic
  return result;
};
const getAllEnrolledCoursesFromDb = async () => {
  const result = ''; // Your Business Logic
  return result;
};

const getSingleEnrolledCourseFromDb = async (id: string) => {
  const result = await EnrolledCourse.findById(id);

  return result;
};

const updateEnrolledCourseIntoDB = async (
  id: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const result = await EnrolledCourse.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteEnrolledCourseIntoDB = async (id: string) => {
  const result = await EnrolledCourse.findByIdAndDelete(id);
  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  getAllEnrolledCoursesFromDb,
  getSingleEnrolledCourseFromDb,
  updateEnrolledCourseIntoDB,
  deleteEnrolledCourseIntoDB,
  updateEnrollCourseMarksIntoDb,
};
