import { Request, Response } from 'express'
import { StudentServices } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    // console.log('Controller ', studentData)
    const result = await StudentServices.createStudentToDb(studentData)
    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Student Creation Failed',
      error
    })
  }
}

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentsFromDb()
    if (result.length) {
      res.status(200).json({
        success: true,
        message: 'Students Data Retrieved Successfully',
        data: result
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Students Data Retrieved Failed',
        data: []
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Student Retrieved Failed',
      error
    })
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Student Retrieved by ID Failed',
      error
    })
  }
}

export const StudentControllers = {
  createStudent,
  getStudents,
  getSingleStudent
}
