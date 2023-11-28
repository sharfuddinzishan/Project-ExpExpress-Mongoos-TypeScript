import { z } from 'zod'

const nameZodValidatorSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name Empty')
    .min(6, 'First Name Length is Less Than 6')
    .max(30, 'First Name Length Exceed 30 Character Limit')
    .trim()
    .regex(/^[A-Za-z]+$/, {
      message: 'Only Character Allowed'
    })
    .refine(
      (val) => {
        const CapitalizeFirst =
          val.trim().charAt(0).toUpperCase() + val.slice(1)
        return CapitalizeFirst === val
      },
      {
        message: `First Letter Must Capital.`
      }
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, 'Last Name Missing')
    .max(30, 'Last Name Length Exceed Character Limit')
    .trim()
})

const guardianZodValidationSchema = z.object({
  fatherName: z.string().min(6, 'Father Name Minimum Length 6').trim(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z
    .string()
    .min(1, 'Father Contact Empty')
    .min(11, 'Father Contact Not Valid'),
  motherName: z.string().min(6, 'Mother Name Minimum Length 6').trim(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional()
})

const localGuardianZodValidationSchema = z.object({
  name: z.string().min(1).min(3).trim(),
  occupation: z.string().optional(),
  contactNo: z.string().min(11, '11 Digit Atleast'),
  address: z.string().min(1)
})

const studentZodValidationSchema = z.object({
  id: z.string().min(1, 'Unique ID Must Be Provided'),
  name: nameZodValidatorSchema,
  email: z
    .string()
    .email()
    .min(7, 'Email Should Be Valid & Unique')
    .toLowerCase()
    .trim(),
  password: z.string(),
  confirmPassword: z.string(),
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string(),
  contactNo: z
    .string()
    .min(1, 'Student Contact Missing')
    .min(11, 'Student Contact Number Should Not Below 11 Digit')
    .max(14, 'Student Should Not Above 14 Digit')
    .trim(),
  emergencyContactNo: z
    .string()
    .min(1, 'Emergency Contact Missing')
    .min(11, 'Emergency Contact Number Should Not Below 11 Digit')
    .max(14, 'Emergency Should Not Above 14 Digit')
    .trim(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string().min(1, 'Present Address Can Not Be Empty'),
  permanentAddress: z.string().min(1, 'Permanent Address Can Not Be Empty'),
  guardian: guardianZodValidationSchema,
  localGuardian: localGuardianZodValidationSchema,
  isActive: z.enum(['active', 'blocked']).default('active'),
  profileImg: z.string().optional()
})

export default studentZodValidationSchema
