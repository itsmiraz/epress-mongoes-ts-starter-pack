import express from 'express';
import { EnrolledCourseControllers } from './EnrolledCourse.controller';

const router = express.Router();

router.post('/create', EnrolledCourseControllers.createEnrolledCourse);

router.get('/', EnrolledCourseControllers.getAllEnrolledCourses);
router.get('/:id', EnrolledCourseControllers.getSingleEnrolledCourse);
router.patch('/:id', EnrolledCourseControllers.updateEnrolledCourse);
router.delete('/:id', EnrolledCourseControllers.deleteEnrolledCourse);

export const EnrolledCourseRoutes = router;
