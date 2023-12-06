import express from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidationShcemas } from '../faculty/faculty.validation';
import { AdminValidationShcemas } from '../admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createstudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(FacultyValidationShcemas.createFacultySchema),
  UserController.createFaculty,
);
router.post(
  '/create-admin',
  validateRequest(AdminValidationShcemas.createAdminValidationSchema),
  UserController.createAdmin,
);

export const UserRoutes = router;
