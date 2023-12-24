import express from 'express';
import { EnrolledCourseControllers } from './EnrolledCourse.controller';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseValidations } from './EnrolledCourse.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-enroll-course',
  auth('student'),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrollCourseMarks,
);
router.get('/', EnrolledCourseControllers.getAllEnrolledCourses);
router.get('/:id', EnrolledCourseControllers.getSingleEnrolledCourse);
router.patch('/:id', EnrolledCourseControllers.updateEnrolledCourse);
router.delete('/:id', EnrolledCourseControllers.deleteEnrolledCourse);

export const EnrolledCourseRoutes = router;
