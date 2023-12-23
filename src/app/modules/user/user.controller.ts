import { UserServices } from './user.servicee';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentintoDb(
    req.file,
    password,
    studentData,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student is Created SuccessFully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: payload } = req.body;

  const result = await UserServices.createFcaultyintoDb(
    req.file,
    password,
    payload,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Faculty is Created SuccessFully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: payload } = req.body;

  const result = await UserServices.createAdminIntoDb(
    req.file,
    password,
    payload,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin is Created SuccessFully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const result = await UserServices.getMeFromDb(req.user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User data retrieved SuccessFully',
    data: result,
  });
});
const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Status changed SuccessFully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
