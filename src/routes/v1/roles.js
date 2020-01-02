import express from 'express'
import { list, show, update, create, destroy } from '../../controllers/roles'
import { authLogin } from '../../middlewares/authentications'
import { validateCreate, validateShow, validateUpdate, validateDelete } from '../../validations/roles'

const router = new express.Router()

router.get('/v1/roles', authLogin, list)
router.get('/v1/roles/:id', authLogin, validateShow, show)
router.patch('/v1/roles/:id', authLogin, validateUpdate, update)
router.post('/v1/roles', authLogin, validateCreate, create)
router.delete('/v1/roles/:id', authLogin, validateDelete, destroy)

export default router