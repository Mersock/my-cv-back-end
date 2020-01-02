import express from 'express';
import { list, create, show, update, destroy } from '../../controllers/posts';
import { validateCreate } from '../../validations/posts'

const router = new express.Router();

router.get('/v1/posts', list)
router.post('/v1/posts', validateCreate, create)
router.get('/v1/posts/:id', show)
router.patch('/v1/posts/:id', update)
router.delete('/v1/posts/:id', destroy)

export default router