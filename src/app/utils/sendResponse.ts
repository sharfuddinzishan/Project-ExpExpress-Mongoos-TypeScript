import { Response } from 'express'

type TResponse<T> = {
  success: boolean
  statusCode: number
  message?: string
  data: T
}
const sendResponse = <T>(res: Response, datas: TResponse<T>) => {
  const { success, statusCode, message, data } = datas
  res.status(statusCode).json({
    success,
    statusCode,
    message,
    data
  })
}

export default sendResponse
