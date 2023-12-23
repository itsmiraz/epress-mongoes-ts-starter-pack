import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'Id is must Required',
    }),

    password: z.string({
      required_error: 'Password is must Required',
    }),
  }),
});
const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old Password is must Required',
    }),

    password: z.string({
      required_error: 'Password is must Required',
    }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is Required',
    }),
  }),
});

const forgetPasswordSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User Id is must Required',
    }),
  }),
});
const resetPassword = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User Id is must Required',
    }),
    newPassword: z.string({
      required_error: 'New Password is  Required',
    }),
  }),
});

export const LoginValidations = {
  loginValidationSchema,
  changePasswordValidation,
  refreshTokenValidationSchema,
  forgetPasswordSchema,
  resetPassword,
};
