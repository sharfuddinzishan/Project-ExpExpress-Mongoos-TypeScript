import { Schema, model } from 'mongoose'
import { TStudent } from './student.interface'

// Sub Schema of studentSchema
const nameSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name Missing'],
    minlength: [6, 'First Name Length Must Not Be Less Than 6'],
    maxlength: [30, 'First Name Length Must Not Be More Than 30']
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name Missing'],
    minlength: [1, 'First Name Length Must Not Be Zero'],
    maxlength: [30, 'First Name Length Must Not Be More Than 30']
  }
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
    id: {
      type: String,
      required: [true, 'Unique ID Must Be Provided'],
      unique: true
    },
    name: {
      type: nameSchema,
      required: [true, 'Name Must Be Provided']
    },
    email: { type: String, required: [true, 'Unique Email Must Be Provided'] },
    gender: {
      type: String,
      required: [true, 'Gender Must Be Provided'],
      enum: {
        values: ['Male', 'Female'],
        message: 'Only Male or Female'
      }
    },
    dateOfBirth: { type: String },
    contactNo: { type: String, required: [true, 'Your Contact No Missing'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Missing']
    },
    //   Enum type Blood Group
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: 'Blood Group Must Be Within ({VALUES})'
      }
    },
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
