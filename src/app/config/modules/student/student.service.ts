import { TStudent } from './student.interface'
import { StudentModel } from './student.model'

const createStudentToDb = async (student: TStudent) => {
  const result = await StudentModel.create(student)
  return result
}

export const StudentServices = {
  createStudentToDb
}
