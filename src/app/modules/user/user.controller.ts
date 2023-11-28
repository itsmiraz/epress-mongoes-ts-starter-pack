import { UserServices } from './user.servicee';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  // creating a schema validation using zod
  const { password, student: studentData } = req.body;

  // const ZodParseData = studentValidationSchema.parse(studentData);

  const result = await UserServices.createStudentintoDb(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student is Created SuccessFully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
