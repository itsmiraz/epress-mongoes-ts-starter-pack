import { z } from 'zod';
import { USER_STATUS } from './user.contstant';

const userSchemaValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .min(6, { message: 'Password must be minimum 6 characters' })
    .max(20, { message: 'Passoword cant not be more than 20 characters' })
    .optional(),
});

const changeStatusValidtionSchema = z.object({
  body: z.object({
    status: z.enum([...USER_STATUS] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  userSchemaValidationSchema,
  changeStatusValidtionSchema,
};
