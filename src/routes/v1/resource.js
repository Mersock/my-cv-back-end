const express = require('express')
const router = new express.Router()
const resourceController = require('../../controllers/resources')
const { authLogin } = require('../../middlewares/authentications')
const { validateCreate, validateDelete, validateShow, validateUpdate } = require('../../validations/resources')

router.get('/v1/resource', authLogin, resourceController.list)
router.get('/v1/resource/:id', authLogin, validateShow, resourceController.show)
router.post('/v1/resource', authLogin, validateCreate, resourceController.create)
router.patch('/v1/resource/:id', authLogin, validateUpdate, resourceController.update)
router.delete('/v1/resource/:id', authLogin, validateDelete, resourceController.delete)

module.exports = router