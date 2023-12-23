import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(255),
  middleName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string().min(1).max(255),
  fatherContact: z.string().min(1).max(255),
  fatherOccupation: z.string().min(1).max(255),
  motherContact: z.string().min(1).max(255),
  motherOccupation: z.string().min(1).max(255),
  motherName: z.string().min(1).max(255),
});

const createLocalGuardianValidationSchema = z.object({
  occupation: z.string().min(1).max(255),
  name: z.string().min(1).max(255),
  contact: z.string().min(1).max(255),
  address: z.string().min(1).max(255),
});

const createstudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6).max(20).optional(),
    student: z.object({
      name: createUserNameValidationSchema,
      email: z.string().email().min(1).max(255),
      gender: z.enum(['Male', 'Female']),
      dateOfBirth: z.string().optional(),
      contactNumber: z.string().min(1).max(255),
      emergencyContactNo: z.string().min(1).max(255),
      bloodGroup: z.enum(['A+', 'B+', 'AB+', 'O+']).optional(),
      presentAddress: z.string().min(1).max(255),
      permanentAddress: z.string().min(1).max(255),
      // profile: z.string().optional(),
      Guardian: createGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      localGuardian: createLocalGuardianValidationSchema,
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(255).optional(),
  middleName: z.string().min(1).max(255).optional(),
  lastName: z.string().min(1).max(255).optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1).max(255).optional(),
  fatherContact: z.string().min(1).max(255).optional(),
  fatherOccupation: z.string().min(1).max(255).optional(),
  motherContact: z.string().min(1).max(255).optional(),
  motherOccupation: z.string().min(1).max(255).optional(),
  motherName: z.string().min(1).max(255).optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  occupation: z.string().min(1).max(255).optional(),
  name: z.string().min(1).max(255).optional(),
  contact: z.string().min(1).max(255).optional(),
  address: z.string().min(1).max(255).optional(),
});

const updatestudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      email: z.string().email().min(1).max(255).optional(),
      gender: z.enum(['Male', 'Female']).optional(),
      dateOfBirth: z.string().optional().optional(),
      contactNumber: z.string().min(1).max(255).optional(),
      emergencyContactNo: z.string().min(1).max(255).optional(),
      bloodGroup: z.enum(['A+', 'B+', 'AB+', 'O+']).optional().optional(),
      presentAddress: z.string().min(1).max(255).optional(),
      permanentAddress: z.string().min(1).max(255).optional(),
      profile: z.string().optional().optional(),
      Guardian: updateGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
    }),
  }),
});

export const studentValidations = {
  createstudentValidationSchema,
  updatestudentValidationSchema,
};
