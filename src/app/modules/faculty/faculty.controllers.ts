import { catchAsync } from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { FacultyServices } from './faculty.services';

const getAllFaculty = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await FacultyServices.getAllFacultiesFromDb(query);
  res.status(200).json({
    succuss: true,
    message: 'Faculties are Successfully retrived',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const facultyId = req.params.id;
  const result = await FacultyServices.getSingleFacultyFromDb(facultyId);
  res.status(200).json({
    succuss: true,
    message: 'Here is your Faculty',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const facultyID = req.params.id;
  const result = await FacultyServices.deleteFacultyFromDb(facultyID);
  res.status(200).json({
    succuss: true,
    message: 'Faculty Deleted Success fully',
    data: result,
  });
});

const updateFacultyData = catchAsync(async (req, res) => {
  const facultyId = req.params.id;
  const payload = req.body.faculty;
  const result = await FacultyServices.updateFacultyFromDb(facultyId, payload);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculty Data Updated SuccessFully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculty,
  getSingleFaculty,
  deleteFaculty,
  updateFacultyData,
};
