import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validation';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      succuss: true,
      message: 'Students are Successfully retrived',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.id;
    const result = await StudentServices.getSingleStudentFromDb(studentId);
    res.status(200).json({
      succuss: true,
      message: 'Here is your student',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.id;
    const result = await StudentServices.delteStudentFromDb(studentId);
    res.status(200).json({
      succuss: true,
      message: 'Student Deleted Success fully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateStudentData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  getSingleStudent,
  getAllStudents,
  updateStudentData,
  deleteStudent,
};
