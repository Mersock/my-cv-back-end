import _ from 'lodash'
import { body, param } from 'express-validator'
import { validatetions } from '../utils/validations'
import Permission from '../models/permissions'

export const validateCreate = validatetions([
    body('name').notEmpty().withMessage('name is required.')
        .custom(async name => {
            const permissions = await Permission.findOne({ name })
            if (!_.isEmpty(permissions)) {
                throw new Error(`name is ${name} has been taken`)
            }
        })
]);

export const validateUpdate = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.'),
    body('name').optional().notEmpty().withMessage('name must be required.')
        .custom(async (value, { req }) => {
            const id = req.params.id
            const roles = await Permission.find({ _id: { $ne: id }, name: { $in: [value] } })
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