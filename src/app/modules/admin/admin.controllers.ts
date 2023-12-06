import { catchAsync } from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { AdminServices } from './admin.services';

const getAllAdmins = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await AdminServices.getAllAdminsFromDb(query);
  res.status(200).json({
    succuss: true,
    message: 'Admins are Successfully retrived',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const adminId = req.params.id;
  const result = await AdminServices.getSingleAdminFromDb(adminId);
  res.status(200).json({
    succuss: true,
    message: 'Here is your Admin',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const facultyID = req.params.id;
  const result = await AdminServices.deleteAdminFromDb(facultyID);
  res.status(200).json({
    succuss: true,
    message: 'Admin Deleted Success fully',
    data: result,
  });
});

const updateAdminData = catchAsync(async (req, res) => {
  const adminId = req.params.id;
  const payload = req.body.admin;
  const result = await AdminServices.updateAdminFromDb(adminId, payload);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Admin Data Updated SuccessFully',
    data: result,
  });
});

export const AdminControllers = {
  updateAdminData,
  deleteAdmin,
  getSingleAdmin,
  getAllAdmins,
};
