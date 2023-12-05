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

const createFacultySchema = z.object({
  body: z.object({
    password: z.string().min(6).max(20),
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
      profile: createStringSchema('Profile').optional(),
      isDeleted: z.boolean(),
    }),
  }),
});
const updateFacultySchema = z.object({
  body: z.object({
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
      academicFacult: createStringSchema('Academic Faculty id'),
      designation: createStringSchema('Designation'),
      profile: createStringSchema('Profile').optional(),
      isDeleted: z.boolean(),
    }),
  }),
});

export const FacultyValidationShcemas = {
  createFacultySchema,
  updateFacultySchema,
};
