import { StudentModel } from './student.model'

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
  getStudentsFromDb,
  getSingleStudentById,
  deleteStudentbyId
}
