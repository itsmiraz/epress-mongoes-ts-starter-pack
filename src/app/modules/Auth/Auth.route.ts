import express from 'express';
import { AuthControllers } from './Auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { LoginValidations } from './Auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contstant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(LoginValidations.loginValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/change-passoword',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(LoginValidations.changePasswordValidation),
  AuthControllers.changePassword,
);
router.post(
  '/refresh-token',
  validateRequest(LoginValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);
router.post(
  '/forget-password',
  validateRequest(LoginValidations.forgetPasswordSchema),
  AuthControllers.forgetPassword,
);
router.post(
  '/reset-password',
  validateRequest(LoginValidations.resetPassword),
  AuthControllers.resetPassword,
);

export const AuthRoutes = router;
