import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import studentZodValidationSchema from './studentValidator'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    // console.log('Controller ', studentData)
    const vda = studentZodValidationSchema.safeParse(studentData)

    if (vda.success) {
      console.log(vda.data)
      const result = await StudentServices.createStudentToDb(vda.data)
      res.status(200).json({
        success: true,
        message: 'Student Created Successfully',
        data: result
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Student Validation Failed',
        error: vda.error.errors
      })
    }
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
