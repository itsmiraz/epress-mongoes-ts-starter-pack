import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.servicee';
import createError from '../../utils/createError';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentintoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic Department  is Created SuccessFully',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDb();
  res.status(200).json({
    succuss: true,
    message: 'Academic Department are Successfully retrived',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const departmentId = req.params.id;
  const result =
    await AcademicDepartmentServices.getSingletAcademicDepartmentFromDb(
      departmentId,
    );

  if (!result) {
    return next(createError(404, 'Could Not Found Department Details'));
  }

  res.status(200).json({
    succuss: true,
    message: 'Here is your Academic Department',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      departmentId,
      req.body,
    );
  res.status(200).json({
    succuss: true,
    message: ' Academic Department Updated',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getSingleAcademicDepartment,
  getAllAcademicDepartment,
  updateAcademicDepartment,
};
