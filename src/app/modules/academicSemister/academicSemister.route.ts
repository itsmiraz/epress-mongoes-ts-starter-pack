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

router.get('/', AcademicSemisterControllers.getAllAcademicSemisters);
router.get('/:id', AcademicSemisterControllers.getSingleAcademicSemister);

export const AcademicSemisterRotues = router;
