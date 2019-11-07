const express = require('express');
const router = new express.Router();
const postsController = require('../../controllers/posts');
const { validateCreate } = require('../../validations/posts')

router.get('/v1/posts', postsController.getAll)
router.post('/v1/posts', validateCreate, postsController.create)


module.exports = router