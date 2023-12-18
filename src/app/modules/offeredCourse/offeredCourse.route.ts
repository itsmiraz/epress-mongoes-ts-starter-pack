import express from 'express';
import { offeredCourseControllers } from './offeredCourse.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseControllers.createofferedCourse,
);

router.get('/', offeredCourseControllers.getAllofferedCourses);
router.get('/:id', offeredCourseControllers.getSingleofferedCourse);
router.patch('/:id', offeredCourseControllers.updateofferedCourse);
router.delete('/:id', offeredCourseControllers.deleteofferedCourse);

export const OfferedCourseRoutes = router;
