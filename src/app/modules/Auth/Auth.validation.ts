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

export const LoginValidations = {
  loginValidationSchema,
};
