import { Stuedent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentintoDb = async (student: Stuedent) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find({});
  return result;
};
const getSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentintoDb,
  getAllStudentsFromDB,
  getSingleStudentFromDb,
};
