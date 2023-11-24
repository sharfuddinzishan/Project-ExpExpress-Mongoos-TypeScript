import { Schema, model } from 'mongoose'
import { TStudent } from './student.interface'

// Sub Schema of studentSchema
const nameSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true }
})
const guardianSchema = new Schema({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String },
  motherContactNo: { type: String }
})
const localGuardianSchema = new Schema({
  name: { type: String, required: true },
  occupation: { type: String },
  contactNo: { type: String, required: true },
  address: { type: String, required: true }
})

// studentSchema is an instance
const studentSchema = new Schema<TStudent>(
  {
    id: { type: String },
    name: nameSchema,
    email: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    //   Enum type Blood Group
    bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    isActive: { type: String, required: true },
    profileImg: { type: String }
  },
  { versionKey: false }
)

// Student Model

export const StudentModel = model<TStudent>('Student', studentSchema)
