const _ = require('lodash')
const { validatetions } = require('../utils/validations')
const { check, body, param } = require('express-validator')
const User = require('../models/users')


exports.validateCreate = validatetions([
    body('username').isLength({ min: 4 }).withMessage('username must be least 4 chars.')
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

exports.validateUpdate = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.'),
    body('username').optional().isLength({ min: 4 }).withMessage('username must be least 4 chars.'),
    body('password').optional().isLength({ min: 6 }).withMessage('password must be least 6 chars long.'),
    body('firstname').optional().not().isEmpty().withMessage('firstname must not empty.'),
    body('lastname').optional().not().isEmpty().withMessage('lastname must not empty.')])

exports.validateShow = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])

exports.validateDelete = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])

