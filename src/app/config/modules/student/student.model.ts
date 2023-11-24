import { model } from 'mongoose'
import { studentSchema } from './student.schema'
import { TStudent } from './student.interface'

const Student = model<TStudent>('Student', studentSchema)
