import express from 'express';
import { semisterRegistrationControllers } from './semisterRegistration.controller';

const router = express.Router();

router.post(
  '/create',
  semisterRegistrationControllers.createsemisterRegistration,
);

router.get('/', semisterRegistrationControllers.getAllsemisterRegistrations);
router.get(
  '/:id',
  semisterRegistrationControllers.getSinglesemisterRegistration,
);
router.patch(
  '/:id',
  semisterRegistrationControllers.updatesemisterRegistration,
);
router.delete(
  '/:id',
  semisterRegistrationControllers.deletesemisterRegistration,
);

export const SemisterRegistrationRoutes = router;
