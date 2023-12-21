import { catchAsync } from '../../utils/catchAsync';
import { AuthServices } from './Auth.servicee';
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: 'User Logged in successfully ',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePasswordIntoDb(
    req.user,
    passwordData,
  );
  res.status(200).json({
    success: true,
    message: 'Password Changed successfully ',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
