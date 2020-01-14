import express from 'express'
import postsRouter from './v1/posts'
import usersRouter from './v1/users'
import authRouter from './authentications'
import roleRouter from './v1/roles'
import permissionsRouter from './v1/permissions'
import clientRouter from './v1/client'

const router = express.Router()

router.use(postsRouter)
router.use(usersRouter)
router.use(authRouter)
router.use(roleRouter)
router.use(permissionsRouter)
router.use(clientRouter)

export default router;
