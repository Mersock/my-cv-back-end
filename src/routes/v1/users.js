const express = require('express')
const guard = require('express-jwt-permissions')()
const router = new express.Router()
const userController = require('../../controllers/users')
const { authLogin } = require('../../middlewares/authentications')
const { validateCreate, validateUpdate, validateShow, validateDelete } = require('../../validations/users')

const listMiddleware = [
    authLogin,
    guard.check(['admin'], ['users:list'])
]
const listPermissinsMiddleware = [
    authLogin,
    guard.check(['admin'], ['users:list', 'permissions:list'])
]
const readMiddleware = [
    authLogin,
    guard.check(['admin'], ['users:read'])
]
const readPermisisonsMiddleware = [
    authLogin,
    guard.check(['admin'], ['users:read', 'permissions:list'])
]
const createMiddleware = [
    authLogin,
    guard.check(['admin'], ['users.create'])
]
const updateMiddleware = [
    authLogin,
    guard.check(['admin'], ['users:update'])
]
const deleteMiddleware = [
    authLogin,
    guard.check(['admin'], ['users:delete'])
]

router.get('/v1/users', listMiddleware, userController.list)
router.get('/v1/users/permissions', listPermissinsMiddleware, userController.listWithPermission)
router.get('/v1/users/:id', readMiddleware, validateShow, userController.show)
router.get('/v1/users/:id/permissions', readPermisisonsMiddleware, validateShow, userController.showWithPermissions)
router.post('/v1/users', createMiddleware, validateCreate, userController.create)
router.patch('/v1/users/:id', updateMiddleware, validateUpdate, userController.update)
router.delete('/v1/users/:id', deleteMiddleware, validateDelete, userController.delete)

module.exports = router
