import express from 'express'
import { login, refreshToken, logout } from '../controllers/authentications'
import { validateLogin, validateRefreshToken } from '../validations/authentications'

const router = new express.Router()

router.post('/login', validateLogin, login)
router.post('/refreshToken', validateRefreshToken, refreshToken)
router.post('/reject/refreshToken', logout)

export default router