import { Request, Response } from 'express'
import { StudentServices } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body?.student
    const result = await StudentServices.createStudentToDb(student)
    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result
    })
  } catch (err) {
    console.log('Student Creation Failed')
  }
}

export const StudentControllers = {
  createStudent
}
