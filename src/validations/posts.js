const {body} = require('express-validator');

exports.validateCreate = [
    body('title')
        .not()
        .isEmpty(),
    body('author')
        .not()
        .isEmpty(),
    body('body')
        .not()
        .isEmpty(),
    body('slug')
        .not()
        .isEmpty()

]