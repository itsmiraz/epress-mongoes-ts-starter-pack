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

const getAllAcademicSemistersFromDb = async () => {
  const result = await AcademicSemister.find({});
  return result;
};

const getSingletAcademicSemisterFromDb = async (id: string) => {
  const result = await AcademicSemister.findById(id);

  return result;
};

export const AcademicSemisterServices = {
  createAcademicSemisterintoDB,
  getAllAcademicSemistersFromDb,
  getSingletAcademicSemisterFromDb,
};
