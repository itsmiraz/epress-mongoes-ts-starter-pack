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

  return lastStudent?.id ? lastStudent?.id.substring(6) : undefined;
};

export const generateStudentId = async (payload: TAcademicSemister | null) => {
  const currentId = (await findLastSudent()) || (0).toString();

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload?.year}${payload?.code}${incrementId}`;

  return incrementId;
};
