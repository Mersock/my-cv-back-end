import _ from 'lodash'
import { validatetions } from '../utils/validations'
import { body, param, query, check } from 'express-validator'
import User from '../models/users'
import Role from '../models/roles'
import mongoose from 'mongoose'

export const validateList = validatetions([
    query('limit').optional().isNumeric().withMessage('limit must be numeric.'),
    query('page').optional().isNumeric().withMessage('page must be numeric.'),
    query('sortType').optional().isIn(['asc', 'desc']).withMessage('sortType can be either asc or desc'),
])

export const validateCreate = validatetions([
    body('username').isLength({ min: 4 }).withMessage('username must be least 4 chars.')
        .custom(async username => {
            let user = await User.findOne({ username })
            if (!_.isEmpty(user)) {
                throw new Error(`username is ${username} has been taken`)
            }
        }),
    body('password').notEmpty().withMessage('password must be require.')
        .isLength({ min: 6 }).withMessage('password must be least 6 chars long.'),
    body('firstname').notEmpty().withMessage('firstname must be require.'),
    body('lastname').notEmpty().withMessage('lastname must be require.'),
    body('roles').optional()
        .isArray().withMessage('roles must be array.')
        .custom(async (value, { req }) => {
            let ids = _.isArray(value) ? value : [];
            let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
            if (findDuplicates(ids).length != 0) {
                throw new Error(`roles ${findDuplicates(value).toString()} duplicate.`)
            }
        })
        .custom(async (value, { req }) => {
            let ids = _.isArray(value) ? value : [];
            let id = ids.map(_id => new mongoose.Types.ObjectId(_id))
            let roles = await Role.find({ "_id": { $in: id } })
            let rolesId = _.map(roles, '_id')
            if (!_.isEqual(_.sortBy(id), _.sortBy(rolesId))) {
                throw new Error(`roles invalid value`)
            }
        })
]);

export const validateUpdate = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.'),
    body('username').optional().isLength({ min: 4 }).withMessage('username must be least 4 chars.')
        .custom(async (value, { req }) => {
            let id = req.params.id
            let user = await User.find({ _id: { $ne: id }, username: { $in: [value] } })
            if (user.length > 0) {
                throw new Error(`username is ${value} has been taken`)
            }
        }),
    body('password').optional().isLength({ min: 6 }).withMessage('password must be least 6 chars long.'),
    body('firstname').optional().notEmpty().withMessage('firstname must not empty.'),
    body('lastname').optional().notEmpty().withMessage('lastname must not empty.'),
    body('roles').optional()
        .isArray().withMessage('roles must be array.')
        .custom(async (value, { req }) => {
            let ids = _.isArray(value) ? value : [];
            let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
            if (findDuplicates(ids).length != 0) {
                throw new Error(`roles ${findDuplicates(value).toString()} duplicate.`)
            }
        })
        .custom(async (value, { req }) => {
            let ids = _.isArray(value) ? value : [];
            let id = ids.map(_id => new mongoose.Types.ObjectId(_id))
            let roles = await Role.find({ "_id": { $in: id } })
            let rolesId = _.map(roles, '_id')
            if (!_.isEqual(_.sortBy(id), _.sortBy(rolesId))) {
                throw new Error(`roles invalid value`)
            }
        })
])

export const validateShow = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])

export const validateDelete = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])


