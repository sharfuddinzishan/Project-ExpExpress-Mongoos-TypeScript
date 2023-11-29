import { TStudent } from './student.interface'
import { StudentModel } from './student.model'

const createStudentToDb = async (student1: TStudent) => {
  // console.log('Service createStudentToDb data ', student1)
  if (await StudentModel.isExistStudentById(student1.id)) {
    throw new Error('User Exist')
  }
  const result = await StudentModel.create(student1)
  return result
}

const getStudentsFromDb = async () => {
  const result = await StudentModel.find()
  return result
}

const getSingleStudentById = async (id: string) => {
  // eslint-disable-next-line no-console
  console.log('Service getSingleStudentById id', id)
  const result = StudentModel.findOne({ id })
    .select('-password -confirmPassword')
    .lean()
  return result
}

const deleteStudentbyId = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true })
  return result
}
export const StudentServices = {
  createStudentToDb,
  getStudentsFromDb,
  getSingleStudentById,
  deleteStudentbyId
}
