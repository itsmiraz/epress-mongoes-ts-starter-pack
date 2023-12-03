import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.servicee';

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

const getSingleAcademicSemister = catchAsync(async (req, res) => {
  const semisterId = req.params.id;
  const result =
    await AcademicDepartmentServices.getSingletAcademicDepartmentFromDb(
      semisterId,
    );
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
  getSingleAcademicSemister,
  getAllAcademicDepartment,
  updateAcademicDepartment,
};
