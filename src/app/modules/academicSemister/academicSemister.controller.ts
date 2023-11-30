import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { AcademicSemisterServices } from './academicSemister.servicee';

const createAcademicSemister = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.createAcademicSemisterintoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic Semister is Created SuccessFully',
    data: result,
  });
});

export const AcademicSemisterControllers = {
  createAcademicSemister,
};
