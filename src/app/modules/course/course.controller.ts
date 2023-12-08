import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { CourseServices } from './course.servicee';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course  is Created SuccessFully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDb();
  res.status(200).json({
    succuss: true,
    message: 'Courses are Successfully retrived',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const courseId = req.params.id;
  const result = await CourseServices.getSingleCourseFromDB(courseId);
  res.status(200).json({
    succuss: true,
    message: 'Here is your Cours',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const courseId = req.params.id;
  const result = await CourseServices.deleteCourseIntoDb(courseId);
  res.status(200).json({
    succuss: true,
    message: 'Course Deleted SuccessFully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
};
