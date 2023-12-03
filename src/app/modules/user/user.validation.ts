import { z } from 'zod'

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Password Must Be String' })
    .min(5)
    .max(20)
})

export const UsersValidation = {
  userValidationSchema
}
