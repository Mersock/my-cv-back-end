const express = require('express')
const router = new express.Router()
const authController = require('../controllers/authentications')
const { validateLogin, validateRefreshToken } = require('../validations/authentications')

router.post('/login', validateLogin, authController.login)
router.post('/refreshToken', validateRefreshToken, authController.refreshToken)
router.post('/logout', authController.logout)

module.exports = router