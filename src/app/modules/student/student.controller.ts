import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import { StudentModel } from './student.model'

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
    // eslint-disable-next-line no-console
    console.log('getSingleId ', studentId)
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

const deleteStudent = async (req: Request, res: Response) => {
  const studentId = req.params.studentId
  try {
    if (await StudentModel.isExistStudentById(studentId)) {
      const result = await StudentServices.deleteStudentbyId(studentId)
      if (result.modifiedCount) {
        res.status(200).json({
          success: true,
          message: 'Student',
          data: result
        })
      } else {
        res.status(400).json({
          success: false,
          message: 'Deleted Failed'
        })
      }
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err
    })
  }
}

export const StudentControllers = {
  getStudents,
  getSingleStudent,
  deleteStudent
}
