import _ from 'lodash'
import { validatetions } from '../utils/validations'
import { body, param, query } from 'express-validator'
import Client from '../models/client'

export const validateList = validatetions([
    query('limit').optional().isNumeric().withMessage('limit must be numeric.'),
    query('page').optional().isNumeric().withMessage('page must be numeric.'),
    query('sortType').optional().isIn(['asc', 'desc']).withMessage('sortType can be either asc or desc'),
])

export const validateCreate = validatetions([
    body('name').isLength({ min: 4 }).withMessage('name must be least 4 chars.')
        .custom(async name => {
            let client = await Client.findOne({ name })
            if (!_.isEmpty(client)) {
                throw new Error(`name is ${name} has been taken`)
            }
        }),
]);

export const validateUpdate = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.'),
    body('name').optional().isLength({ min: 4 }).withMessage('username must be least 4 chars.')
        .custom(async (value, { req }) => {
            let id = req.params.id
            let client = await Client.find({ _id: { $ne: id }, name: { $in: [value] } })
            if (client.length > 0) {
                throw new Error(`name is ${value} has been taken`)
            }
        }),
])

export const validateShow = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])

export const validateDelete = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])


