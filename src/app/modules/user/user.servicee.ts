import config from '../../config';
import { TStuedent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentintoDb = async (
  password: string,
  studentData: TStuedent,
) => {
  const userData: Partial<TUser> = {};

  // if passoword is not gived , use default password

  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  // Manually generated Id
  userData.id = '202310003';

  // Create a new user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    // set id, _Id
    studentData.id = newUser.id;
    studentData.user = newUser._id; //referencing _ id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentintoDb,
};
