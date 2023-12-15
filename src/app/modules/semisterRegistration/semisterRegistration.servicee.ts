import { semisterRegistration } from './semisterRegistration.model';
import { TsemisterRegistration } from './semisterRegistration.interface';

const createsemisterRegistrationIntoDB = async (payload: TsemisterRegistration) => {
  const result = await semisterRegistration.create(payload);

  return result;
};

const getAllsemisterRegistrationsFromDb = async () => {
  const result = ''; // Your Business Logic
  return result;
};

const getSinglesemisterRegistrationFromDb = async (id: string) => {
  const result = await semisterRegistration.findById(id);

  return result;
};

const updatesemisterRegistrationIntoDB = async (id: string, payload: Partial<TsemisterRegistration>) => {
  const result = await semisterRegistration.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deletesemisterRegistrationIntoDB = async (id: string) => {
  const result = await semisterRegistration.findByIdAndDelete(id);
  return result;
};

export const semisterRegistrationServices = {
  createsemisterRegistrationIntoDB,
  getAllsemisterRegistrationsFromDb,
  getSinglesemisterRegistrationFromDb,
  updatesemisterRegistrationIntoDB,
  deletesemisterRegistrationIntoDB,
};
