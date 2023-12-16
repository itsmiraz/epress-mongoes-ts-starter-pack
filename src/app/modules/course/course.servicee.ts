import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchAbleFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

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
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true, session },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to Update Basic Details',
      );
    }

    //check if we have to update the preruisite qourse or not
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPrerequiste = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPrerequisteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPrerequiste } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPrerequisteCourse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to Delete Prerquisite Course',
        );
      }

      //filter out the new Prerequisite
      const newPrerequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newPrerequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPrerequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newPrerequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to add Prerquisite Course',
        );
      }
    }

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
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
const assingFacultiesWithCourseIntoDb = async (
  id: string,
  payload: TCourseFaculty,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload.faculties } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};
const removeFacultiesFromCourseIntoDb = async (
  id: string,
  payload: TCourseFaculty,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
  return result;
};

const getAssingedFacultiesIntoCourseFromDb = async (id: string) => {
  const result = await CourseFaculty.findById(id)
    .populate('course')
    .populate('faculties');
  return result;
};

export const CourseServices = {
  getAllCourseFromDb,
  getSingleCourseFromDB,
  createCourseIntoDb,
  deleteCourseIntoDb,
  updateCourseIntoDb,
  assingFacultiesWithCourseIntoDb,
  removeFacultiesFromCourseIntoDb,
  getAssingedFacultiesIntoCourseFromDb,
};
