const { check } = require('express-validator');

exports.validateCreate = [
    check('title').not().isEmpty(),
    check('author').not().isEmpty(),
    check('body').not().isEmpty(),
    check('slug').not().isEmpty()
]