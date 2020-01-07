import express from 'express';
import permissions from 'express-jwt-permissions'
import { list, create, show, update, destroy } from '../../controllers/posts';
import { authLogin } from '../../middlewares/authentications'
import { validateCreate, validateList, validateUpdate, validateShow, validateDelete } from '../../validations/posts'

const guard = permissions()
const router = new express.Router();

const listMiddleware = [
    authLogin,
    guard.check(['admin'], ['posts:list'])
]

const readMiddleware = [
    authLogin,
    guard.check(['admin'], ['posts:read'])
]

const createMiddleware = [
    authLogin,
    guard.check(['admin'], ['posts.create'])
]
const updateMiddleware = [
    authLogin,
    guard.check(['admin'], ['posts:update'])
]
const deleteMiddleware = [
    authLogin,
    guard.check(['admin'], ['posts:delete'])
]

router.get('/v1/posts', listMiddleware, validateList, list)
router.post('/v1/posts', createMiddleware, validateCreate, create)
router.get('/v1/posts/:id', readMiddleware, validateShow, show)
router.patch('/v1/posts/:id', updateMiddleware, validateUpdate, update)
router.delete('/v1/posts/:id', deleteMiddleware, validateDelete, destroy)

export default router