import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemisterRotues } from '../modules/academicSemister/academicSemister.route';

const router = Router();

const ModuleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semister',
    route: AcademicSemisterRotues,
  },
];

ModuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
