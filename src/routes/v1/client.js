import express from 'express'
import permissions from 'express-jwt-permissions'
import { list, show, create, update, destroy } from '../../controllers/client'
import { authLogin } from '../../middlewares/authentications'
import { validateCreate, validateUpdate, validateShow, validateDelete, validateList } from '../../validations/client'

const guard = permissions()
const router = new express.Router()

const listMiddleware = [
    authLogin,
    guard.check(['admin'], ['client:list'])
]
const readMiddleware = [
    authLogin,
    guard.check(['admin'], ['client:read'])
]
const createMiddleware = [
    authLogin,
    guard.check(['admin'], ['client.create'])
]
const updateMiddleware = [
    authLogin,
    guard.check(['admin'], ['client:update'])
]
const deleteMiddleware = [
    authLogin,
    guard.check(['admin'], ['client:delete'])
]

router.get('/v1/client', listMiddleware, validateList, list)
router.get('/v1/client/:id', readMiddleware, validateShow, show)
router.post('/v1/client', createMiddleware, validateCreate, create)
router.patch('/v1/client/:id', updateMiddleware, validateUpdate, update)
router.delete('/v1/client/:id', deleteMiddleware, validateDelete, destroy)

export default router
