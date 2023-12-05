import { NextFunction, Request, RequestHandler, Response } from 'express'
import { StudentServices } from './student.service'
import { StudentModel } from './student.model'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      next(err)
    })
  }
}
const getStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getStudentsFromDb()
  if (result.length) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Students Data Retrieved Successfully',
      data: result
    })
  } else {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Students Data Retrieved Failed',
      data: []
    })
  }
})

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params
  // eslint-disable-next-line no-console
  const result = await StudentServices.getSingleStudentById(studentId)
  if (result) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Students Data Retrieved Successfully',
      data: result
    })
  } else {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Students Data Retrieved Failed',
      data: {}
    })
  }
})

const deleteStudent = catchAsync(async (req, res, next) => {
  const studentId = req?.params?.studentId
  if (await StudentModel.isExistStudentById(studentId)) {
    const result = await StudentServices.deleteStudentbyId(studentId)
    if (result.modifiedCount) {
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Students Created Successfully',
        data: null
      })
    } else {
      sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Students Created Failed',
        data: null
      })
    }
  }
})

export const StudentControllers = {
  getStudents,
  getSingleStudent,
  deleteStudent
}
