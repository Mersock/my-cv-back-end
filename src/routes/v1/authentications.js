import express from 'express'
import { login, refreshToken, logout } from '../controllers/authentications'
import { validateLogin, validateRefreshToken } from '../validations/authentications'

const router = new express.Router()

router.post('/v1/login', validateLogin, login)
router.post('/v1/refreshToken', validateRefreshToken, refreshToken)
router.post('/v1/reject/refreshToken', logout)

export default router