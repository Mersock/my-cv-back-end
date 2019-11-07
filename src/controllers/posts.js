const Post = require('../models/posts');
const { validationResult } = require('express-validator');


exports.getAll = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json(post)
    } catch (error) {
        res.status(500)
    }
};

exports.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const post = new Post(req.body)
    try {
        await post.save();
        res.status(201).json(post)
    } catch (error) {
        console.log(error)
        const { errors } = error
        res.status(400).send({
            status_code: 400,
            errors
        })
    }
}
