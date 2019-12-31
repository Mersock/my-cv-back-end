const _ = require('lodash')
const { validatetions } = require('../utils/validations')
const { body, param } = require('express-validator')
const User = require('../models/users')
const Permissions = require('../models/permissions')
const mongoose = require('mongoose')

exports.validateCreate = validatetions([
    body('username').isLength({ min: 4 }).withMessage('username must be least 4 chars.')
        .custom(async username => {
            const user = await User.findOne({ username })
            if (!_.isEmpty(user)) {
                throw new Error(`username is ${username} has been taken`)
            }
        }),
    body('password').notEmpty().withMessage('password must be require.')
        .isLength({ min: 6 }).withMessage('password must be least 6 chars long.'),
    body('firstname').notEmpty().withMessage('firstname must be require.'),
    body('lastname').notEmpty().withMessage('lastname must be require.'),
    body('permissions').optional()
        .isArray().withMessage('Permissions must be array.')

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
            permissionsId = _.map(permissions, '_id')
            if (!_.isEqual(_.sortBy(id), _.sortBy(permissionsId))) {
                throw new Error(`permissions invalid value`)
            }
        })
]);

exports.validateUpdate = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.'),
    body('username').optional().isLength({ min: 4 }).withMessage('username must be least 4 chars.')
        .custom(async (value, { req }) => {
            const id = req.params.id
            const user = await User.find({ _id: { $ne: id }, username: { $in: [value] } })
            if (user.length > 0) {
                throw new Error(`username is ${value} has been taken`)
            }
        }),
    body('password').optional().isLength({ min: 6 }).withMessage('password must be least 6 chars long.'),
    body('firstname').optional().notEmpty().withMessage('firstname must not empty.'),
    body('lastname').optional().notEmpty().withMessage('lastname must not empty.'),
    body('permissions').optional()
        .isArray().withMessage('Permissions must be array.')
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
            permissionsId = _.map(permissions, '_id')
            if (!_.isEqual(_.sortBy(id), _.sortBy(permissionsId))) {
                throw new Error(`permissions invalid value`)
            }
        })
])

exports.validateShow = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])

exports.validateDelete = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])


