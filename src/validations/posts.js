const {body} = require('express-validator');

exports.validateCreate = [
    body('title')
        .not().isEmpty().withMessage('must be not empty')
        .isLength({min:1,max:2}).withMessage('must be maximum 1000 chars'),
    body('author')
        .not().isEmpty().withMessage('must be not empty'),
    body('body')
        .not().isEmpty()
        .isLength({min:1,max:2}).withMessage('must be at least 5 chars long '),
    body('slug')
        .not().isEmpty().withMessage('must be not empty')
]