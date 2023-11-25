import { Schema, model } from 'mongoose'
import { TStudent } from './student.interface'
import validator from 'validator'

// Sub Schema of studentSchema
const nameSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name Missing'],
    minlength: [6, '{VALUE} Length is Less Than 6'],
    maxlength: [30, '{VALUE} Length Exceed 30 Character Limit'],
    validate: {
      validator: function (val: string) {
        const inputName = val.trim()
        const CapitalizeFirst =
          inputName.charAt(0).toUpperCase() + inputName.slice(1)
        return inputName === CapitalizeFirst && validator.isAlpha(inputName)
      },
      message: 'Your Given [{VALUE}] is not valid. First Letter Must Capital.'
    },
    trim: true
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name Missing'],
    minlength: [1, 'First Name Length Must Not Be Zero'],
    maxlength: [30, 'First Name Length Must Not Be More Than 30'],
    trim: true
  }
})
const guardianSchema = new Schema({
  fatherName: {
    type: String,
    required: [true, 'Father Name Missing'],
    trim: true
  },
  fatherOccupation: { type: String },
  fatherContactNo: { type: String, required: [true, 'Father Contact Missing'] },
  motherName: {
    type: String,
    required: [true, 'Mother Name Missing'],
    trim: true
  },
  motherOccupation: { type: String },
  motherContactNo: { type: String }
})
const localGuardianSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: function (val: string) {
        return !validator.isEmpty(val)
      },
      message: 'Local Guardian Name Must Not Empty'
    },
    trim: true
  },
  occupation: { type: String },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact No Missing']
  },
  address: { type: String, required: [true, 'Local Guardian Address Missing'] }
})

// studentSchema is an instance
const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: [true, 'Unique ID Must Be Provided'],
      unique: true
    },
    name: {
      type: nameSchema,
      required: [true, 'Name Must Be Provided']
    },
    email: {
      type: String,
      required: [true, 'Unique Email Must Be Provided'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (val: string) {
          return validator.isEmail(val.trim())
        },
        message: '[{VALUE}] is not a valid email address'
      }
    },
    gender: {
      type: String,
      required: [true, 'Gender Must Be Provided'],
      enum: {
        values: ['Male', 'Female'],
        message: 'Only Male or Female'
      }
    },
    dateOfBirth: { type: String },
    contactNo: {
      type: String,
      required: [true, 'Your Contact No Missing'],
      min: [11, 'Contact Number Should Not Below 11 Digit'],
      max: [14, 'Contact Number Should Not Above 14 Digit'],
      trim: true
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Missing'],
      trim: true
    },
    //   Enum type Blood Group
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: 'Given {VALUE} Blood Group Invalid )'
      }
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address Missing']
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address Missing']
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian Information Missing']
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian Information Missing']
    },
    isActive: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        message: 'Status Active or Inactive only'
      },
      default: 'active'
    },
    profileImg: { type: String }
  },
  { versionKey: false }
)

// Student Model

export const StudentModel = model<TStudent>('Student', studentSchema)
