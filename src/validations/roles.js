const _ = require('lodash')
const { validatetions } = require('../utils/validations')
const { body, param } = require('express-validator')
const Resource = require('../models/resoureces')
const Roles = require('../models/roles');
const mongoose = require('mongoose')

exports.validateCreate = validatetions([
    body('name').notEmpty().withMessage('name is required.')
        .custom(async name => {
            const roles = await Roles.findOne({ name })
            if (!_.isEmpty(roles)) {
                throw new Error(`name is ${name} has been taken`)
            }
        }),
    body('resources').optional().isArray().withMessage('resources must be array')
        .notEmpty().withMessage('resources is required')
        .custom(async (value, { req }) => {
            const ids = _.isArray(value) ? value : [];
            const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
            if (findDuplicates(ids).length != 0) {
                throw new Error(`resources ${findDuplicates(value).toString()} duplicate.`)
            }
        })
        .custom(async (value, { req }) => {
            const ids = _.isArray(value) ? value : [];
            const id = ids.map(_id => new mongoose.Types.ObjectId(_id))
            const resource = await Resource.find({ "_id": { $in: id } })
            resourceId = _.map(resource, '_id')
            if (!_.isEqual(_.sortBy(id), _.sortBy(resourceId))) {
                throw new Error(`resources invalid value`)
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
        }),
    body('resources').optional().isArray().withMessage('Permissions must be object.')
        .custom(async (value, { req }) => {
            const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
            if (findDuplicates(value).length != 0) {
                throw new Error(`resources ${findDuplicates(value).toString()} duplicate.`)
            }
        })
        .custom(async (value, { req }) => {
            const id = value.map(_id => new mongoose.Types.ObjectId(_id))
            const resource = await Resource.find({ "_id": { $in: id } })
            resourceId = _.map(resource, '_id')
            if (!_.isEqual(_.sortBy(id), _.sortBy(resourceId))) {
                throw new Error(`resources invalid value`)
            }
        })

])

exports.validateShow = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])

exports.validateDelete = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])