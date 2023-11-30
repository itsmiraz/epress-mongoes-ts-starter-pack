import {
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

type TAcademicSemisterCodeMapper = {
  [key: string]: string;
};

export const academicSemisterCodeMapper: TAcademicSemisterCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
