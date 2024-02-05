import QueryBuilder from '../../builder/QueryBuilder';
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

const getAllAcademicSemistersFromDb = async (
  query: Record<string, unknown>,
) => {
  // const result = await AcademicSemister.find({});
  const academicSemesterQuery = new QueryBuilder(AcademicSemister.find(), query)
    .search(['name'])
    .paginate()
    .filter()
    .sort()
    .fields();

  const result = await academicSemesterQuery.modelQuery;
  const meta = await academicSemesterQuery.countTotal();
  return {
    result,
    meta,
  };
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
