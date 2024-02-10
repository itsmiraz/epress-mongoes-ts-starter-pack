import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semisterRegistrationServices } from './semisterRegistration.servicee';
const createsemisterRegistration = catchAsync(async (req, res) => {
  const result =
    await semisterRegistrationServices.createsemisterRegistrationIntoDB(
      req.body,
    );

  res.status(200).json({
    success: true,
    message: 'Semister Registration successfully created',
    data: result,
  });
});

const getAllsemisterRegistrations = catchAsync(async (req, res) => {
  const result =
    await semisterRegistrationServices.getAllsemisterRegistrationsFromDb(
      req.query,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'SemisterRegistrations successfully retrieved',
    meta: result.meta,
    data: result.result,
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
    message: 'Here is your SemisterRegistration',
    data: result,
  });
});

const updatesemisterRegistration = catchAsync(async (req, res) => {
  const semisterRegistrationId = req.params.id;
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
