import { NextFunction, Request, Response } from 'express'
import { UserServices } from './user.service'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body
    // console.log('Request Body ', req.body)
    // const result = UsersValidation.userValidationSchema.safeParse(studentData)
    // console.log('Parse Result ', result)

    const result = await UserServices.createStudentToDb(studentData, password)
    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const UserControllers = {
  createStudent
}
