import { StudentServices } from './student.servicee';
import { catchAsync } from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  res.status(200).json({
    succuss: true,
    message: 'Students are Successfully retrived',
    data: result,
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
  const studentData = req.body;
  const result = await StudentServices.updateLocalGuardianData(
    studentId,
    studentData,
  );
  res.status(201).json({
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
