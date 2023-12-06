import { TAcademicSemister } from '../academicSemister/academicSemister.interface';
import { User } from './user.model';

const findLastSudent = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent?.id : undefined;
};
const findLastFaculty = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent?.id : undefined;
};
const findLastAdmin = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent?.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemister | null) => {
  let currentId = (0).toString();

  const lastStudentId = await findLastSudent();

  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const currentSemisterCode = payload?.code;
  const currentYear = payload?.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemisterCode &&
    lastStudentSemesterYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload?.year}${payload?.code}${incrementId}`;

  return incrementId;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastStudentId = await findLastFaculty();

  if (lastStudentId) {
    currentId = lastStudentId.substring(5);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};
export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastStudentId = await findLastAdmin();

  if (lastStudentId) {
    currentId = lastStudentId.substring(5);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;

  return incrementId;
};
