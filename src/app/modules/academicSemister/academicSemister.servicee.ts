import { academicSemisterCodeMapper } from './academicSemister.constant';
import { TAcademicSemister } from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';

const createAcademicSemisterintoDB = async (payload: TAcademicSemister) => {
  if (academicSemisterCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semister Code');
  }

  const result = await AcademicSemister.create(payload);

  return result;
};

export const AcademicSemisterServices = {
  createAcademicSemisterintoDB,
};
