import express from 'express'
import permissions from 'express-jwt-permissions'
import { list, show, create, update, destroy, listWithRoles, showWithRoles } from '../../controllers/users'
import { authLogin } from '../../middlewares/authentications'
import { validateCreate, validateUpdate, validateShow, validateDelete, validateList } from '../../validations/users'

const guard = permissions()
const router = new express.Router()

const listMiddleware = [
    authLogin,
    guard.check(['admin'], ['users:list'])
]
const listRolesMiddleware = [
    authLogin,
    guard.check(['admin'], ['users:list', 'permissions:list'])
]
const readMiddleware = [
    authLogin,
    guard.check(['admin'], ['users:read'])
]
const readRolesMiddleware = [
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

router.get('/v1/users', listMiddleware, validateList, list)
router.get('/v1/users/roles', listRolesMiddleware, listWithRoles)
router.get('/v1/users/:id', readMiddleware, validateShow, show)
router.get('/v1/users/:id/roles', readRolesMiddleware, validateShow, showWithRoles)
router.post('/v1/users', createMiddleware, validateCreate, create)
router.patch('/v1/users/:id', updateMiddleware, validateUpdate, update)
router.delete('/v1/users/:id', deleteMiddleware, validateDelete, destroy)

export default router
