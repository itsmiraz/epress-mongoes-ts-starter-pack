import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchAbleFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDb = async (query: Record<string, unknown>) => {
  const coursQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await coursQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const deleteCourseIntoDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  getAllCourseFromDb,
  getSingleCourseFromDB,
  createCourseIntoDb,
  deleteCourseIntoDb,
};
