import { z } from 'zod';

const createStringSchema = (fieldName: string) =>
  z
    .string({
      invalid_type_error: `${fieldName} must be a string`,
      required_error: `${fieldName} is required`,
    })
    .transform((data) => data.trim());

const createUserNameSchema = z.object({
  firstName: createStringSchema('First Name'),
  middleName: createStringSchema('Middle Name'),
  lastName: createStringSchema('Last Name'),
});
const updateUserNameSchema = z.object({
  firstName: createStringSchema('First Name').optional(),
  middleName: createStringSchema('Middle Name').optional(),
  lastName: createStringSchema('Last Name').optional(),
});

const createFacultySchema = z.object({
  body: z.object({
    password: z.string().min(6).max(20).optional(),
    faculty: z.object({
      name: createUserNameSchema,
      gender: z.enum(['Male', 'Female']),
      email: createStringSchema('Email'),
      dateOfBirth: createStringSchema('Date of Birth'),
      contactNumber: createStringSchema('Contact Number'),
      emergencyContactNo: createStringSchema('Emergency Contact No'),
      presentAddress: createStringSchema('Present Address'),
      permanentAddress: createStringSchema('Permanent Address'),
      academicDepartment: createStringSchema('Academic Department id'),
      academicFaculty: createStringSchema('Academic Faculty id'),
      designation: createStringSchema('Designation'),
      // profile: createStringSchema('Profile').optional(),
      isDeleted: z.boolean(),
    }),
  }),
});
const updateFacultySchema = z.object({
  body: z.object({
    faculty: z.object({
      name: updateUserNameSchema.optional(),
      gender: z.enum(['Male', 'Female']).optional(),
      email: createStringSchema('Email').optional(),
      dateOfBirth: createStringSchema('Date of Birth').optional(),
      contactNumber: createStringSchema('Contact Number').optional(),
      emergencyContactNo: createStringSchema('Emergency Contact No').optional(),
      presentAddress: createStringSchema('Present Address').optional(),
      permanentAddress: createStringSchema('Permanent Address').optional(),
      academicDepartment: createStringSchema(
        'Academic Department id',
      ).optional(),
      academicFacult: createStringSchema('Academic Faculty id').optional(),
      designation: createStringSchema('Designation').optional(),
      profile: createStringSchema('Profile').optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const FacultyValidationShcemas = {
  createFacultySchema,
  updateFacultySchema,
};
