import express from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidationShcemas } from '../faculty/faculty.validation';
import { AdminValidationShcemas } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.contstant';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.createstudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(FacultyValidationShcemas.createFacultySchema),
  UserController.createFaculty,
);
router.post(
  '/create-admin',
  validateRequest(AdminValidationShcemas.createAdminValidationSchema),
  UserController.createAdmin,
);
router.get(
  '/me',
  auth('admin', 'faculty', 'student'),

  UserController.getMe,
);

export const UserRoutes = router;
