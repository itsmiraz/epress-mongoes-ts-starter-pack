import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.servicee';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // creating a schema validation using zod

    const { password, student: studentData } = req.body;

    // const ZodParseData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentintoDb(
      password,
      studentData,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Student is Created SuccessFully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createStudent,
};
