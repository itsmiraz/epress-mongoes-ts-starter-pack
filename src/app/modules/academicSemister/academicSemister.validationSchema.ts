// import { z } from 'zod';
// import { AcademicSemisterNames } from './academicSemister.model';
// const months = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ] as const;
// const createAcademicSemisterValidationSchema = z.object({
//   body: z.object({
//     name: z.enum(['Autumn', 'Summer', 'Fall']),
//     code: z.enum(['01', '02', '03']),
//     endMonth: z.enum(months),
//     startMonth: z.enum(months),
//     year: z.date(),
//   }),
// });

// export const AcademicSemisterValidations = {
//   createAcademicSemisterValidationSchema,
// };
