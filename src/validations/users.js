const { validatetions } = require('../utils/validations')
const { body, param } = require('express-validator')
const User = require('../models/users')
const ObjectId = require('mongoose').Types.ObjectId


exports.validateCreate = validatetions([
    body('username').not().isEmpty().withMessage('username must be require.')
        .custom(async username => {
            const user = await User.findOne({ username })
            if (user) {
                throw new Error(`username is ${username} has been taken`)
            }
        }),
    body('password').not().isEmpty().withMessage('password must be require.')
        .isLength({ min: 6 }).withMessage('password must be least 6 chars long.'),
    body('firstname').not().isEmpty().withMessage('firstname must be require.'),
    body('lastname').not().isEmpty().withMessage('lastname must be require.')
]);

exports.validateShow = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])

exports.validateDelete = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])

