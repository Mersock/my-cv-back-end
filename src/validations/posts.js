const { check } = require('express-validator');

exports.validateCreate = [
    check('name').isLength({ min: 3 }),
    check('email').isEmail(),
    check('age').isNumeric()
]