const express = require('express')
const guard = require('express-jwt-permissions')()
const router = new express.Router()
const permissionController = require('../../controllers/permissions')
const { authLogin } = require('../../middlewares/authentications')
const { validateCreate, validateShow, validateUpdate, validateDelete } = require('../../validations/permissions')

const listMiddleware = [
    authLogin,
    guard.check(['admin'], ['permissions.list'])
]

const readMiddleware = [
    authLogin,
    guard.check(['admin'], ['permissions:read'])
]

const createMiddleware = [
    authLogin,
    guard.check(['admin'], ['permissions.create'])
]
const updateMiddleware = [
    authLogin,
    guard.check(['admin'], ['permissions:update'])
]
const deleteMiddleware = [
    authLogin,
    guard.check(['admin'], ['permissions:delete'])
]

router.get('/v1/permissions', listMiddleware, permissionController.list)
router.get('/v1/permissions/:id', readMiddleware, validateShow, permissionController.show)
router.patch('/v1/permissions/:id', updateMiddleware, validateUpdate, permissionController.update)
router.post('/v1/permissions', createMiddleware, validateCreate, permissionController.create)
router.delete('/v1/permissions/:id', deleteMiddleware, validateDelete, permissionController.delete)

module.exports = router