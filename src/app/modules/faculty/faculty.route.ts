import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controllers';
import { FacultyValidationShcemas } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyControllers.getAllFaculty);

router.get('/:id', FacultyControllers.getSingleFaculty);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.put(
  '/:id',
  validateRequest(FacultyValidationShcemas.updateFacultySchema),
  FacultyControllers.updateFacultyData,
);

export const FacultyRoutes = router;
