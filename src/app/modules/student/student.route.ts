import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router.get('/:id', StudentControllers.getSingleStudent);

router.delete('/:id', StudentControllers.deleteStudent);

router.put(
  '/:id',
  validateRequest(studentValidations.updatestudentValidationSchema),
  StudentControllers.updateStudentData,
);

export const StudentRoutes = router;
