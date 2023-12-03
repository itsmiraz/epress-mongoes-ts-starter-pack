import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemisterRotues } from '../modules/academicSemister/academicSemister.route';
import { AcademicFacultyRotues } from '../modules/academicFaculty/AcademicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';

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
  {
    path: '/academic-faculty',
    route: AcademicFacultyRotues,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
];

ModuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
