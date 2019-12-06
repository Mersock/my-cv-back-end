const express = require('express')
const router = new express.Router()
const authController = require('../../controllers/authentications')

router.post('/v1/login', authController.login)

module.exports = router