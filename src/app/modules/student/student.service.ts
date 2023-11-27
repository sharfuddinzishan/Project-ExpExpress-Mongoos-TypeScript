import { TStudent } from './student.interface'
import { StudentModel } from './student.model'

const createStudentToDb = async (student: TStudent) => {
  if (await StudentModel.isExistStudentById(student?.id)) {
    throw new Error('User Exist')
  }
  const result = await StudentModel.create(student)
  return result
}

const getStudentsFromDb = async () => {
  const result = await StudentModel.find()
  return result
}

const getSingleStudentById = async (id: string) => {
  const result = StudentModel.findOne({ id })
  return result
}
export const StudentServices = {
  createStudentToDb,
  getStudentsFromDb,
  getSingleStudentById
}
