/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync'

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body
  const result = await UserServices.createStudentToDb(studentData, password)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result
  })
})

export const UserControllers = {
  createStudent
}
