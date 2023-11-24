import { Request, Response } from 'express'
import { StudentServices } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    const result = await StudentServices.createStudentToDb(studentData)
    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result
    })
  } catch (err) {
    console.log('Student Creation Failed')
  }
}

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentsFromDb()
    res.status(200).json({
      success: true,
      message: 'Students Data Retrieved Successfully',
      data: result
    })
  } catch (err) {
    console.log('Student Retrieved Failed')
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentById(studentId)
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Students Data Retrieved By ID Successfully',
        data: result
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Students Data Retrieved By ID Failed',
        data: {}
      })
    }
  } catch (err) {
    console.log('Student Retrieved By ID Failed')
  }
}

export const StudentControllers = {
  createStudent,
  getStudents,
  getSingleStudent
}
