import { Request, Response } from 'express';
import { UserServices } from './user.servicee';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using zod

    const { password, student: studentData } = req.body;

    // const ZodParseData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentintoDb(
      password,
      studentData,
    );

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

export const UserController = {
  createStudent,
};
