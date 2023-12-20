import express from 'express';
import { AuthControllers } from './Auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { LoginValidations } from './Auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(LoginValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
