import { catchAsync } from '../../utils/catchAsync';
import { offeredCourseServices } from './offeredCourse.servicee';
const createofferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.createofferedCourseIntoDB(
    req.body,
  );

  res.status(200).json({
    success: true,
    message: 'offeredCourse successfully created',
    data: result,
  });
});

const getAllofferedCourses = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.getAllofferedCoursesFromDb(
    req.query,
  );
  res.status(200).json({
    success: true,
    message: 'offeredCourses successfully retrieved',
    data: result,
  });
});
const getMyOfferedCourses = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await offeredCourseServices.getMyOfferedCourseFromDb(
    userId,
    req.query,
  );
  res.status(200).json({
    success: true,
    message: 'offeredCourses successfully retrieved',
    data: result,
  });
});

const getSingleofferedCourse = catchAsync(async (req, res) => {
  const offeredCourseId = req.params.id;
  const result =
    await offeredCourseServices.getSingleofferedCourseFromDb(offeredCourseId);

  res.status(200).json({
    success: true,
    message: 'Here is your offeredCourse',
    data: result,
  });
});

const updateofferedCourse = catchAsync(async (req, res) => {
  const { offeredCourseId } = req.params;
  const result = await offeredCourseServices.updateofferedCourseIntoDB(
    offeredCourseId,
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'offeredCourse Updated',
    data: result,
  });
});

const deleteofferedCourse = catchAsync(async (req, res) => {
  const { offeredCourseId } = req.params;
  const result =
    await offeredCourseServices.deleteofferedCourseIntoDB(offeredCourseId);
  res.status(200).json({
    success: true,
    message: 'offeredCourse Deleted Successfully',
    data: result,
  });
});

export const offeredCourseControllers = {
  createofferedCourse,
  getSingleofferedCourse,
  getAllofferedCourses,
  deleteofferedCourse,
  updateofferedCourse,
  getMyOfferedCourses,
};
