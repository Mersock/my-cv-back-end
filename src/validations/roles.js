import _ from 'lodash'
import { validatetions } from '../utils/validations'
import { body, param } from 'express-validator'
import Roles from '../models/roles'

export const validateCreate = validatetions([
    body('name').notEmpty().withMessage('name is required.')
        .custom(async name => {
            let roles = await Roles.findOne({ name })
            if (!_.isEmpty(roles)) {
                throw new Error(`name is ${name} has been taken`)
            }
        })
]);

export const validateUpdate = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.'),
    body('name').optional().notEmpty().withMessage('name must be required.')
        .custom(async (value, { req }) => {
            let id = req.params.id
            let roles = await Roles.find({ _id: { $ne: id }, name: { $in: [value] } })
            if (roles.length > 0) {
                throw new Error(`name is ${value} has been taken`)
            }
        })
])

export const validateShow = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])

export const validateDelete = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])