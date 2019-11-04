const express = require('express');
const router = new express.Router();
const postsController = require('../../controllers/posts');

router.get('/v1/posts', postsController.getAll)

module.exports = router