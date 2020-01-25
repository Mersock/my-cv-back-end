import _ from 'lodash'
import mongoose from 'mongoose'
import { validatetions } from '../utils/validations'
import { body, param } from 'express-validator'
import Roles from '../models/roles'
import Permissions from '../models/permissions'

export const validateCreate = validatetions([
    body('name').notEmpty().withMessage('name is required.')
        .custom(async name => {
            const roles = await Roles.findOne({ name })
            if (!_.isEmpty(roles)) {
                throw new Error(`name is ${name} has been taken`)
            }
        }),
    body('permissions').optional()
        .isArray().withMessage('permissions must be array.')
        .custom(async (value, { req }) => {
            const ids = _.isArray(value) ? value : [];
            const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
            if (findDuplicates(ids).length != 0) {
                throw new Error(`permissions ${findDuplicates(value).toString()} duplicate.`)
            }
        })
        .custom(async (value, { req }) => {
            const ids = _.isArray(value) ? value : [];
            const id = ids.map(_id => new mongoose.Types.ObjectId(_id))
            const permissions = await Permissions.find({ "_id": { $in: id } })
            const permissionsId = _.map(permissions, '_id')
            if (!_.isEqual(_.sortBy(id), _.sortBy(permissionsId))) {
                throw new Error(`permissions invalid value`)
            }
        })
]);

export const validateUpdate = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.'),
    body('name').optional().notEmpty().withMessage('name must be required.')
        .custom(async (value, { req }) => {
            const id = req.params.id
            const roles = await Roles.find({ _id: { $ne: id }, name: { $in: [value] } })
            if (roles.length > 0) {
                throw new Error(`name is ${value} has been taken`)
            }
        }),
    body('permissions').optional()
        .isArray().withMessage('permissions must be array.')
        .custom(async (value, { req }) => {
            const ids = _.isArray(value) ? value : [];
            const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
            if (findDuplicates(ids).length != 0) {
                throw new Error(`permissions ${findDuplicates(value).toString()} duplicate.`)
            }
        })
        .custom(async (value, { req }) => {
            const ids = _.isArray(value) ? value : [];
            const id = ids.map(_id => new mongoose.Types.ObjectId(_id))
            const permissions = await Permissions.find({ "_id": { $in: id } })
            const permissionsId = _.map(permissions, '_id')
            if (!_.isEqual(_.sortBy(id), _.sortBy(permissionsId))) {
                throw new Error(`permissions invalid value`)
            }
        })
])

export const validateShow = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])

export const validateDelete = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])