import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

import {
  StaticStudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName
} from './student.interface'
import config from '../../config'

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
const studentSchema = new Schema<TStudent, StaticStudentModel>(
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
    password: { type: String },
    confirmPassword: { type: String },
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
    profileImg: { type: String },
    isDeleted: { type: Boolean, default: false }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false
  }
)

// Virtuals
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

// Static Method
studentSchema.statics.isExistStudentById = async function (id: string) {
  const isExist = await StudentModel.findOne({ id })
  return isExist
}

studentSchema.pre('find', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const studentCollection = this
  studentCollection.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias, prefer-const
  let student = this
  const hash = await bcrypt.hashSync(student.password, Number(config.salt))
  student.password = hash
  student.confirmPassword = ''
  next()
})

studentSchema.post('save', function (docs, next) {
  // console.log('Post Middleware ', docs)
  docs.password = ''
  next()
})

// Student Model
export const StudentModel = model<TStudent, StaticStudentModel>(
  'Student',
  studentSchema
)
