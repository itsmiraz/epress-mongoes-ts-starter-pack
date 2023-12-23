import config from '../../config';
import { catchAsync } from '../../utils/catchAsync';
import { AuthServices } from './Auth.servicee';
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;

  res
    .cookie('refreshToken', refreshToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: 'User Logged in successfully ',
      data: {
        accessToken,
        needsPasswordChange,
      },
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

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);

  res.status(200).json({
    success: true,
    message: 'Access Token Retrived successfully ',
    data: result,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthServices.forgetPassword(userId);

  res.status(200).json({
    success: true,
    message: 'Reset link is generated successfully ',
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await AuthServices.resetPassoword(req.body, token as string);

  res.status(200).json({
    success: true,
    message: 'Password Reseted successfully ',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
