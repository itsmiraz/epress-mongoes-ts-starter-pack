import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.servicee';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyintoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic Faculty  is Created SuccessFully',
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDb();
  res.status(200).json({
    succuss: true,
    message: 'Academic Faculty are Successfully retrived',
    data: result,
  });
});

const getSingleAcademicSemister = catchAsync(async (req, res) => {
  const semisterId = req.params.id;
  const result =
    await AcademicFacultyServices.getSingletAcademicFacultyFromDb(semisterId);
  res.status(200).json({
    succuss: true,
    message: 'Here is your Academic Faculty',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );
  res.status(200).json({
    succuss: true,
    message: ' Academic Faculty Updated',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getSingleAcademicSemister,
  getAllAcademicFaculty,
  updateAcademicFaculty,
};
