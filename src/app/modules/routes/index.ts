import { Router } from 'express'
import { StudentRouters } from '../student/student.route'
import { UserRouters } from '../user/user.router'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouters
  },
  {
    path: '/students',
    route: StudentRouters
  }
]
moduleRoutes.forEach((getRoute) => router.use(getRoute.path, getRoute.route))

export default router
