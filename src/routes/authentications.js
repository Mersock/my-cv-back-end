const express = require('express')
const router = new express.Router()
const authController = require('../controllers/authentications')

router.post('/login', authController.login)
router.post('/refreshToken', authController.refreshToken)
router.post('/logout',authController.logout)

module.exports = router