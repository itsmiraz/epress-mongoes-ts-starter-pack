import { catchAsync } from '../../utils/catchAsync';
import { EnrolledCourseServices } from './EnrolledCourse.servicee';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: 'EnrolledCourse successfully created',
    data: result,
  });
});

const getAllEnrolledCourses = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.getAllEnrolledCoursesFromDb();
  res.status(200).json({
    success: true,
    message: 'EnrolledCourses successfully retrieved',
    data: result,
  });
});

const getSingleEnrolledCourse = catchAsync(async (req, res) => {
  const EnrolledCourseId = req.params.id;
  const result =
    await EnrolledCourseServices.getSingleEnrolledCourseFromDb(
      EnrolledCourseId,
    );

  res.status(200).json({
    success: true,
    message: 'Here is your EnrolledCourse',
    data: result,
  });
});

const updateEnrolledCourse = catchAsync(async (req, res) => {
  const { EnrolledCourseId } = req.params;
  const result = await EnrolledCourseServices.updateEnrolledCourseIntoDB(
    EnrolledCourseId,
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'EnrolledCourse Updated',
    data: result,
  });
});

const deleteEnrolledCourse = catchAsync(async (req, res) => {
  const { EnrolledCourseId } = req.params;
  const result =
    await EnrolledCourseServices.deleteEnrolledCourseIntoDB(EnrolledCourseId);
  res.status(200).json({
    success: true,
    message: 'EnrolledCourse Deleted Successfully',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  getSingleEnrolledCourse,
  getAllEnrolledCourses,
  deleteEnrolledCourse,
  updateEnrolledCourse,
};
