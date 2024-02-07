import { StudentServices } from './student.servicee';
import { catchAsync } from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const getAllStudents = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await StudentServices.getAllStudentsFromDB(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Students are Successfully retrived',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const studentId = req.params.id;
  const result = await StudentServices.getSingleStudentFromDb(studentId);
  res.status(200).json({
    succuss: true,
    message: 'Here is your student',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const studentId = req.params.id;
  const result = await StudentServices.delteStudentFromDb(studentId);
  res.status(200).json({
    succuss: true,
    message: 'Student Deleted Success fully',
    data: result,
  });
});

const updateStudentData = catchAsync(async (req, res) => {
  const studentId = req.params.id;
  const studentData = req.body.student;
  const result = await StudentServices.updateLocalGuardianData(
    studentId,
    studentData,
  );
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Student Data Updated SuccessFully',
    data: result,
  });
});

export const StudentControllers = {
  getSingleStudent,
  getAllStudents,
  updateStudentData,
  deleteStudent,
};
