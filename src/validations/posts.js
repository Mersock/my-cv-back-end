const { body, param, } = require('express-validator');
const Posts = require('../models/posts')


exports.validateCreate = [
    body('title')
        .not().isEmpty().withMessage('must be not empty')
        .isLength({ min: 1, max: 1000 }).withMessage('must be maximum 1000 chars'),
    body('author')
        .not().isEmpty().withMessage('must be not empty'),
    body('body')
        .not().isEmpty().withMessage('must be not empty')
        .isLength({ min: 1, max: 10000 }).withMessage('must be maximum 10000 chars'),
    body('slug')
        .not().isEmpty().withMessage('must be not empty')
        .custom(async slug => {
            const posts = await Posts.findOne({ slug })
            if (posts) {
                throw new Error(`slug name ${slug} has been taken.`)
            }
        })

]

exports.validateShow = [
    param('id').isMongoId().trim().withMessage('must be not empty')
]

exports.validateDelete = [
    param('id').isMongoId().trim().withMessage('must be not empty')
]