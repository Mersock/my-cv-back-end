const express = require('express')
const router = new express.Router()
const userController = require('../../controllers/users')
const { validateCreate } = require('../../validations/users')

router.get('/v1/users', userController.list)
router.get('/v1/users/:id', userController.show)
router.post('/v1/users', validateCreate, userController.create)
router.patch('/v1/users/:id', userController.update)
router.delete('/v1/users/:id', userController.delete)

module.exports = router
