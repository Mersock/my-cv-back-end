import express from 'express'
import permissions from 'express-jwt-permissions'
import { list, show, update, create, destroy, listWithPermission, showWithPermissions } from '../../controllers/roles'
import { authLogin } from '../../middlewares/authentications'
import { validateCreate, validateShow, validateUpdate, validateDelete } from '../../validations/roles'

const guard = permissions()
const router = new express.Router()

const listMiddleware = [
    authLogin,
    guard.check(['admin'], ['roles:list'])
]

const readMiddleware = [
    authLogin,
    guard.check(['admin'], ['roles:read'])
]

const createMiddleware = [
    authLogin,
    guard.check(['admin'], ['roles.create'])
]
const updateMiddleware = [
    authLogin,
    guard.check(['admin'], ['roles:update'])
]
const deleteMiddleware = [
    authLogin,
    guard.check(['admin'], ['roles:delete'])
]

const listPermissionsMiddleware = [
    authLogin,
    guard.check(['admin'], ['roles:list', 'permissions.list'])
]

const readPermissionsMiddleware = [
    authLogin,
    guard.check(['admin'], ['roles:list', 'permissions.read'])
]

router.get('/v1/roles', listMiddleware, list)
router.get('/v1/roles/permissions', listPermissionsMiddleware, listWithPermission)
router.get('/v1/roles/:id', readMiddleware, validateShow, show)
router.get('/v1/roles/:id/permissions', readPermissionsMiddleware, validateShow, showWithPermissions)
router.patch('/v1/roles/:id', updateMiddleware, validateUpdate, update)
router.post('/v1/roles', createMiddleware, validateCreate, create)
router.delete('/v1/roles/:id', deleteMiddleware, validateDelete, destroy)

export default router