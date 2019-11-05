const express = require('express');
const router = new express.Router();
const postsController = require('../../controllers/posts');

router.get('/v1/posts', postsController.getAll)
router.post('/v1/posts', postsController.insert)


module.exports = router