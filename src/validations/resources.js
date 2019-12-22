const _ = require('lodash')
const { validatetions } = require('../utils/validations')
const { body, param } = require('express-validator')
const Resoureces = require('../models/resoureces')

exports.validateCreate = validatetions([
    body('name').notEmpty().withMessage('name must be required.')
        .custom(async name => {
            const resource = await Resoureces.findOne({ name })
            if (!_.isEmpty(resource)) {
                throw new Error(`name is ${name} has been taken`)
            }
        }),
    body('permissions').optional().isArray().withMessage('Permissions must be object.'),
    body('permissions.*.action').notEmpty().withMessage('action must be require'),
    body('permissions.*.attributes').isArray().withMessage('attributes must be array')
        .notEmpty().withMessage('attributes not empy')
]);

exports.validateUpdate = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.'),
    body('name').optional().notEmpty().withMessage('name must be required.')
        .custom(async (value, { req }) => {
            const id = req.params.id
            const resource = await Resoureces.find({ _id: { $ne: id }, name: { $in: [value] } })
            if (resource.length > 0) {
                throw new Error(`name is ${value} has been taken`)
            }
        }),
    body('permissions').optional().isArray().withMessage('Permissions must be object.'),
    body('permissions.*.action').notEmpty().withMessage('action must be require'),
    body('permissions.*.attributes').isArray().withMessage('attributes must be array')
        .notEmpty().withMessage('attributes not empy')
])

exports.validateShow = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])

exports.validateDelete = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])