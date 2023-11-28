import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()

router.post('/create-student', StudentControllers.createStudent)
router.get('/:studentId', StudentControllers.getSingleStudent)
router.get('/', StudentControllers.getStudents)

export const StudentRouters = router
