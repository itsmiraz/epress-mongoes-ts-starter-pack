import { z } from 'zod';

const preRequisiteCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchmea = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(preRequisiteCourseSchema),
  }),
});

export const CourseValidation = {
  createCourseValidationSchmea,
};
