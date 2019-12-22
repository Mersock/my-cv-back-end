const express = require('express')
const router = new express.Router()
const roleController = require('../../controllers/roles')
const { authLogin } = require('../../middlewares/authentications')
const { validateCreate, validateShow, validateUpdate, validateDelete } = require('../../validations/roles')

router.get('/v1/roles', authLogin, roleController.list)
router.get('/v1/roles/resource', authLogin, roleController.listWithResource)
router.get('/v1/roles/:id', authLogin, validateShow, roleController.show)
router.get('/v1/roles/:id/resource', authLogin, roleController.showWithResource)
router.patch('/v1/roles/:id', authLogin, validateUpdate, roleController.update)
router.post('/v1/roles', authLogin, validateCreate, roleController.create)
router.delete('/v1/roles/:id', authLogin, validateDelete, roleController.delete)

module.exports = router