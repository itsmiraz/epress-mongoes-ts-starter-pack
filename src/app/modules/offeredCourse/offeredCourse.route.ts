import express from 'express';
import { offeredCourseControllers } from './offeredCourse.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contstant';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseControllers.createofferedCourse,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  offeredCourseControllers.getAllofferedCourses,
);
router.get(
  '/my-offered-courses',
  auth(USER_ROLE.student),
  offeredCourseControllers.getMyOfferedCourses,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  offeredCourseControllers.getSingleofferedCourse,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  offeredCourseControllers.updateofferedCourse,
);
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  offeredCourseControllers.deleteofferedCourse,
);

export const OfferedCourseRoutes = router;
