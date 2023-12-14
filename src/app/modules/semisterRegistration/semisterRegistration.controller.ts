import { catchAsync } from '../../utils/catchAsync';
import { semisterRegistrationServices } from './semisterRegistration.servicee';
const createsemisterRegistration = catchAsync(async (req, res) => {
  const result =
    await semisterRegistrationServices.createsemisterRegistrationIntoDB(
      req.body,
    );

  res.status(200).json({
    success: true,
    message: 'semisterRegistration successfully created',
    data: result,
  });
});

const getAllsemisterRegistrations = catchAsync(async (req, res) => {
  const result =
    await semisterRegistrationServices.getAllsemisterRegistrationsFromDb();
  res.status(200).json({
    success: true,
    message: 'semisterRegistrations successfully retrieved',
    data: result,
  });
});

const getSinglesemisterRegistration = catchAsync(async (req, res) => {
  const semisterRegistrationId = req.params.id;
  const result =
    await semisterRegistrationServices.getSinglesemisterRegistrationFromDb(
      semisterRegistrationId,
    );

  res.status(200).json({
    success: true,
    message: 'Here is your semisterRegistration',
    data: result,
  });
});

const updatesemisterRegistration = catchAsync(async (req, res) => {
  const { semisterRegistrationId } = req.params;
  const result =
    await semisterRegistrationServices.updatesemisterRegistrationIntoDB(
      semisterRegistrationId,
      req.body,
    );
  res.status(200).json({
    success: true,
    message: 'semisterRegistration Updated',
    data: result,
  });
});

const deletesemisterRegistration = catchAsync(async (req, res) => {
  const { semisterRegistrationId } = req.params;
  const result =
    await semisterRegistrationServices.deletesemisterRegistrationIntoDB(
      semisterRegistrationId,
    );
  res.status(200).json({
    success: true,
    message: 'semisterRegistration Deleted Successfully',
    data: result,
  });
});

export const semisterRegistrationControllers = {
  createsemisterRegistration,
  getSinglesemisterRegistration,
  getAllsemisterRegistrations,
  deletesemisterRegistration,
  updatesemisterRegistration,
};
