const express = require('express');
const router = new express.Router();
const postsController = require('../../controllers/posts');
const { validateCreate, validateShow, validateDelete } = require('../../validations/posts')

router.get('/v1/posts', postsController.list)
router.post('/v1/posts', validateCreate, postsController.create)
router.get('/v1/posts/:id', validateShow, postsController.show)
router.delete('/v1/posts/:id',validateDelete, postsController.delete)

module.exports = router