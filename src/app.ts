import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { StudentRouters } from './app/modules/student/student.route'

const app: Application = express()

app.use(express.json())
app.use(express.text())
app.use(cors())

// Application Routes
app.use('/api/v1/students', StudentRouters)

const logger = (req: Request, res: Response, next: NextFunction) => {
  // console.log('Logger')
  next()
}

app.get('/', logger, (req: Request, res: Response) => {
  // console.log('API Connected')
  res.send('Everything Worked Fine.')
})

app.all('**', (req: Request, res: Response) => {
  res.status(400).json({
    message: 'No Such Link Exist',
    success: false
  })
})

export default app
