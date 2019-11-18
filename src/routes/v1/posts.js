const express = require('express');
const router = new express.Router();
const postsController = require('../../controllers/posts');
const { validateCreate } = require('../../validations/posts')

router.get('/v1/posts', postsController.list)
router.post('/v1/posts', validateCreate, postsController.create)
router.get('/v1/posts/:id', postsController.show)
router.patch('/v1/posts/:id', postsController.update)
router.delete('/v1/posts/:id', postsController.delete)

module.exports = router