import express from 'express';
import { AcademicSemisterControllers } from './academicSemister.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemisterValidations } from './academicSemister.validationSchema';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-academic-semister',
  auth('superAdmin', 'admin'),
  validateRequest(
    AcademicSemisterValidations.createAcademicSemisterValidationSchema,
  ),
  AcademicSemisterControllers.createAcademicSemister,
);

router.get(
  '/',
  auth('admin'),
  AcademicSemisterControllers.getAllAcademicSemisters,
);
router.get('/:id', AcademicSemisterControllers.getSingleAcademicSemister);

export const AcademicSemisterRotues = router;
