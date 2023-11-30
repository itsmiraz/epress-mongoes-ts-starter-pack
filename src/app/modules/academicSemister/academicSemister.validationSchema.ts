import { z } from 'zod';
import {
  AcademicSemisterCodes,
  AcademicSemisterNames,
  Months,
} from './academicSemister.constant';

const createAcademicSemisterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemisterNames] as [string, ...string[]]),
    code: z.enum([...AcademicSemisterCodes] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    year: z.string(),
  }),
});

export const AcademicSemisterValidations = {
  createAcademicSemisterValidationSchema,
};
