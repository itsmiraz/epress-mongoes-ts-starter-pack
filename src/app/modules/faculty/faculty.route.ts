import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controllers';
import { FacultyValidationShcemas } from './faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contstant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculty,
);

router.get('/:id', FacultyControllers.getSingleFaculty);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.put(
  '/:id',
  validateRequest(FacultyValidationShcemas.updateFacultySchema),
  FacultyControllers.updateFacultyData,
);

export const FacultyRoutes = router;
