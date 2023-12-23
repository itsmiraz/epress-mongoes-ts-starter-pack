import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidationShcemas } from '../faculty/faculty.validation';
import { AdminValidationShcemas } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.contstant';
import { UserValidation } from './user.validation';
import { upload } from '../../utils/sendImagesToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.createstudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(FacultyValidationShcemas.createFacultySchema),
  UserController.createFaculty,
);
router.get('/me', auth('admin', 'faculty', 'student'), UserController.getMe);
router.post(
  '/create-admin',
  validateRequest(AdminValidationShcemas.createAdminValidationSchema),
  UserController.createAdmin,
);
router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.changeStatusValidtionSchema),
  UserController.changeStatus,
);

export const UserRoutes = router;
