import { z } from 'zod';

const CreateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be string',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty id must be string',
    }),
  }),
});
const UpdateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department must be string',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Faculty id must be string',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  UpdateAcademicDepartmentValidationSchema,
  CreateAcademicDepartmentValidationSchema,
};
