import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { dbconnect } from './app/utils/dbconnect'
import globalErrorHandler from './app/modules/middlewares/globalErrorHandler'
import notFound from './app/modules/middlewares/notFound'
import router from './app/modules/routes'

const app: Application = express()

// Parser
app.use(express.json())
app.use(express.text())
app.use(cors())

// Database Connect
dbconnect()

// Application Routes
app.use('/api/v1', router)

const logger = (req: Request, res: Response, next: NextFunction) => {
  // console.log('Logger')
  next()
}

app.get('/', logger, (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'System Running Now'
  })
})

// app.all('**', (req: Request, res: Response) => {
//   res.status(400).json({
//     message: 'No Such Link Exist',
//     success: false
//   })
// })

app.use(globalErrorHandler)
app.use(notFound)

export default app
