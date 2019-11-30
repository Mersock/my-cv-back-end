const express = require('express')
const router = new express.Router()
const userController = require('../../controllers/users')
const { validateCreate, validateUpdate, validateShow, validateDelete } = require('../../validations/users')

router.get('/v1/users', userController.list)
router.get('/v1/users/:id', validateShow, userController.show)
router.post('/v1/users', validateCreate, userController.create)
router.patch('/v1/users/:id', validateUpdate, userController.update)
router.delete('/v1/users/:id', validateDelete, userController.delete)

module.exports = router
