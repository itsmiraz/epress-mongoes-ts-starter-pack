import express from 'express';
import { semisterRegistrationControllers } from './semisterRegistration.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semisterRegistration.validation';

const router = express.Router();

router.post(
  '/create-semister-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semisterRegistrationControllers.createsemisterRegistration,
);

router.get('/', semisterRegistrationControllers.getAllsemisterRegistrations);
router.get(
  '/:id',
  semisterRegistrationControllers.getSinglesemisterRegistration,
);
router.put('/:id', semisterRegistrationControllers.updatesemisterRegistration);
router.delete(
  '/:id',
  semisterRegistrationControllers.deletesemisterRegistration,
);

export const SemisterRegistrationRoutes = router;
