import express from 'express'
import permissions from 'express-jwt-permissions'
import { list, show, update, create, destroy } from '../../controllers/permissions'
import { authLogin } from '../../middlewares/authentications'
import { validateCreate, validateShow, validateUpdate, validateDelete } from '../../validations/permissions'

const guard = permissions()
const router = new express.Router()

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

router.get('/v1/permissions', listMiddleware, list)
router.get('/v1/permissions/:id', readMiddleware, validateShow, show)
router.patch('/v1/permissions/:id', updateMiddleware, validateUpdate, update)
router.post('/v1/permissions', createMiddleware, validateCreate, create)
router.delete('/v1/permissions/:id', deleteMiddleware, validateDelete, destroy)

export default router