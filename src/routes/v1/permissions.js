const express = require('express')
const router = new express.Router()
const permissionController = require('../../controllers/permissions')
const { authLogin } = require('../../middlewares/authentications')
const { validateCreate, validateShow, validateUpdate, validateDelete } = require('../../validations/permissions')

router.get('/v1/permissions', authLogin, permissionController.list)
router.get('/v1/permissions/:id', authLogin, validateShow, permissionController.show)
router.patch('/v1/permissions/:id', authLogin, validateUpdate, permissionController.update)
router.post('/v1/permissions', authLogin, validateCreate, permissionController.create)
router.delete('/v1/permissions/:id', authLogin, validateDelete, permissionController.delete)

module.exports = router