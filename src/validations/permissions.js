const _ = require('lodash')
const { validatetions } = require('../utils/validations')
const { body, param } = require('express-validator')
const Permission = require('../models/permissions');

exports.validateCreate = validatetions([
    body('name').notEmpty().withMessage('name is required.')
        .custom(async name => {
            const permissions = await Permission.findOne({ name })
            if (!_.isEmpty(permissions)) {
                throw new Error(`name is ${name} has been taken`)
            }
        })
]);

exports.validateUpdate = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.'),
    body('name').optional().notEmpty().withMessage('name must be required.')
        .custom(async (value, { req }) => {
            const id = req.params.id
            const roles = await Roles.find({ _id: { $ne: id }, name: { $in: [value] } })
            if (roles.length > 0) {
                throw new Error(`name is ${value} has been taken`)
            }
        })
])

exports.validateShow = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])

exports.validateDelete = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])