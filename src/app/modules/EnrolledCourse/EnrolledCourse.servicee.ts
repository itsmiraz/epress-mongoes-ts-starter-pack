import { TEnrolledCourse } from './EnrolledCourse.interface';
import EnrolledCourse from './EnrolledCourse.model';

const createEnrolledCourseIntoDB = async (payload: TEnrolledCourse) => {
  const result = await EnrolledCourse.create(payload);

  return result;
};

const getAllEnrolledCoursesFromDb = async () => {
  const result = ''; // Your Business Logic
  return result;
};

const getSingleEnrolledCourseFromDb = async (id: string) => {
  const result = await EnrolledCourse.findById(id);

  return result;
};

const updateEnrolledCourseIntoDB = async (
  id: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const result = await EnrolledCourse.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteEnrolledCourseIntoDB = async (id: string) => {
  const result = await EnrolledCourse.findByIdAndDelete(id);
  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  getAllEnrolledCoursesFromDb,
  getSingleEnrolledCourseFromDb,
  updateEnrolledCourseIntoDB,
  deleteEnrolledCourseIntoDB,
};
