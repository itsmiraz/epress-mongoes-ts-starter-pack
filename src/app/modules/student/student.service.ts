import { Student } from './student.model';
import { TLocalGuardian, TStuedent } from './student.interface';

const createStudentintoDb = async (studentData: TStuedent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User Already Exists');
  }
  // Build in static Method
  const result = await Student.create(studentData);

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find({});
  return result;
};
const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });

  const result = await Student.aggregate([{ $match: { id: id } }]);

  return result;
};
const delteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne(
    { id },
    {
      isDeleted: true,
    },
  );
  return result;
};

const updateLocalGuardianData = async (id: string, data: TLocalGuardian) => {
  console.log(id, data);
  const student = Student.isUserExists(id);

  if (!student) {
    throw new Error('Student Does not Exists');
  }

  const result = await Student.findOneAndUpdate(
    { id: id },
    {
      localGuardian: {
        name: data.name,
        occupation: data.occupation,
        contact: data.contact,
        address: data.address,
      },
    },
  );
  return result;
};

export const StudentServices = {
  createStudentintoDb,
  getAllStudentsFromDB,
  getSingleStudentFromDb,
  delteStudentFromDb,
  updateLocalGuardianData,
};
