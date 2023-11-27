import { Schema, model } from 'mongoose'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName
} from './student.interface'

// Sub Schema of studentSchema
const nameSchema = new Schema<TUserName>({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String }
})
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String },
  fatherOccupation: { type: String },
  fatherContactNo: { type: String },
  motherName: { type: String },
  motherOccupation: { type: String },
  motherContactNo: { type: String }
})
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  contactNo: { type: String },
  address: { type: String }
})

// studentSchema is an instance
const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      unique: true
    },
    name: {
      type: nameSchema,
      required: [true, 'Name Must Be Provided']
    },
    email: {
      type: String,
      unique: true
    },
    gender: { type: String },
    dateOfBirth: { type: String },
    contactNo: { type: String },
    emergencyContactNo: { type: String },
    bloodGroup: { type: String },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian Information Missing']
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian Information Missing']
    },
    isActive: { type: String },
    profileImg: { type: String }
  },
  { versionKey: false }
)

// Student Model

export const StudentModel = model<TStudent>('Student', studentSchema)
