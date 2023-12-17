import { Schema, model } from 'mongoose';
import { TAcademicSemister } from './academicSemister.interface';
import {
  AcademicSemisterCodes,
  AcademicSemisterNames,
  Months,
} from './academicSemister.constant';

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
    type: String,
  },
});

academicSemisterSchema.pre('save', async function (next) {
  const isSemisterExists = await AcademicSemister.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemisterExists) {
    throw new Error('Semister is Already Exists');
  }
  next();
});

export const AcademicSemister = model<TAcademicSemister>(
  'AcademicSemester',
  academicSemisterSchema,
);
