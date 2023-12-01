import config from '../../config';
import { AcademicSemister } from '../academicSemister/academicSemister.model';
import { TStuedent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentintoDb = async (password: string, payload: TStuedent) => {
  const userData: Partial<TUser> = {};

  // if passoword is not gived , use default password

  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  // yaar semister 4 digit number

  // find academic semester info
  const admissionSemister = await AcademicSemister.findById(
    payload.admissionSemester,
  );

  // Manually generated Id
  userData.id = await generateStudentId(admissionSemister);

  // Create a new user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    // set id, _Id
    payload.id = newUser.id;
    payload.user = newUser._id; //referencing _ id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentintoDb,
};
