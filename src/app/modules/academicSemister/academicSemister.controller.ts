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

const getAllAcademicSemisters = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.getAllAcademicSemistersFromDb();
  res.status(200).json({
    succuss: true,
    message: 'Academic Semiseters are Successfully retrived',
    data: result,
  });
});

const getSingleAcademicSemister = catchAsync(async (req, res) => {
  const semisterId = req.params.id;
  const result =
    await AcademicSemisterServices.getSingletAcademicSemisterFromDb(semisterId);
  res.status(200).json({
    succuss: true,
    message: 'Here is your Academic Semister',
    data: result,
  });
});

export const AcademicSemisterControllers = {
  createAcademicSemister,
  getAllAcademicSemisters,
  getSingleAcademicSemister,
};
