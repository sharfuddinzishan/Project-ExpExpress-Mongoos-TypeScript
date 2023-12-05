import { Router } from 'express'
import { UserControllers } from './user.controller'
import { StudentControllers } from '../student/student.controller'

const router = Router()

router.post('/create-student', UserControllers.createStudent)
router.get('/students/:studentId', StudentControllers.getSingleStudent)

export const UserRouters = router
