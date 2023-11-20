import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using zod

    const { student: studentData } = req.body;

    const ZodParseData = studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentintoDb(ZodParseData);

    res.status(201).json({
      success: true,
      message: 'Student is Created SuccessFully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      data: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      succuss: true,
      message: 'Students are Successfully retrived',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Something Went Wrong',
      data: err,
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const result = await StudentServices.getSingleStudentFromDb(studentId);
    res.status(200).json({
      succuss: true,
      message: 'Here is your student',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Something Went Wrong',
      data: err,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const result = await StudentServices.delteStudentFromDb(studentId);
    res.status(200).json({
      succuss: true,
      message: 'Student Deleted Success fully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Something Went Wrong',
      data: err,
    });
  }
};

const updateStudentData = async (req: Request, res: Response) => {
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
    res.status(400).json({
      success: false,
      message: 'Something Went Wrong',
      data: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getSingleStudent,
  getAllStudents,
  updateStudentData,
  deleteStudent,
};
