import express from 'express';
import { AcademicSemisterControllers } from './academicSemister.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemisterValidations } from './academicSemister.validationSchema';

const router = express.Router();

router.post(
  '/create-academic-semister',
  validateRequest(
    AcademicSemisterValidations.createAcademicSemisterValidationSchema,
  ),
  AcademicSemisterControllers.createAcademicSemister,
);

export const AcademicSemisterRotues = router;
