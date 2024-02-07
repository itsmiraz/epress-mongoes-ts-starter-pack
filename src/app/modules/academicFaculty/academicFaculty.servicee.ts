import QueryBuilder from '../../builder/QueryBuilder';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyintoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);

  return result;
};

const getAllAcademicFacultyFromDb = async (query: Record<string, unknown>) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .search(['name'])
    .paginate()
    .filter()
    .sort()
    .fields();

  const result = await academicFacultyQuery.modelQuery;
  const meta = await academicFacultyQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getSingletAcademicFacultyFromDb = async (id: string) => {
  const result = await AcademicFaculty.findById(id);

  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyintoDB,
  getAllAcademicFacultyFromDb,
  getSingletAcademicFacultyFromDb,
  updateAcademicFacultyIntoDB,
};
