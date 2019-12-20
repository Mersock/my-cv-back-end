const express = require('express')
const router = new express.Router()
const resourceController = require('../../controllers/resources')

router.post('/v1/resource', resourceController.create)

module.exports = router