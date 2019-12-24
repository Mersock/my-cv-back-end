const express = require('express')
const router = new express.Router()
const userController = require('../../controllers/users')
const { authLogin } = require('../../middlewares/authentications')
const { validateCreate, validateUpdate, validateShow, validateDelete } = require('../../validations/users')

router.get('/v1/users', authLogin, userController.list)
router.get('/v1/users/roles', authLogin, userController.listWithRole)
router.get('/v1/users/:id', authLogin, validateShow, userController.show)
router.get('/v1/users/:id/roles', authLogin, validateShow, userController.showWithRole)
router.post('/v1/users', authLogin, validateCreate, userController.create)
router.patch('/v1/users/:id', authLogin, validateUpdate, userController.update)
router.delete('/v1/users/:id', authLogin, validateDelete, userController.delete)

module.exports = router
