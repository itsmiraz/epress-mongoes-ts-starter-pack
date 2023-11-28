import { Schema, model } from 'mongoose';
import {
  TAcademicSemister,
  TAcademicSemisterCodes,
  TAcademicSemisterNames,
  TMonth,
} from './academicSemister.interface';

export const Months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemisterNames: TAcademicSemisterNames[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const AcademicSemisterCodes: TAcademicSemisterCodes[] = [
  '01',
  '02',
  '03',
];

const academicSemisterSchema = new Schema<TAcademicSemister>({
  name: {
    type: String,
    enum: AcademicSemisterNames,
  },
  code: {
    type: String,
    enum: AcademicSemisterCodes,
  },
  endMonth: {
    type: String,
    enum: Months,
  },
  startMonth: {
    type: String,
    enum: Months,
  },
  year: {
    type: Date,
  },
});

export const AcademicSemister = model<TAcademicSemister>(
  'AcademicSemister',
  academicSemisterSchema,
);
