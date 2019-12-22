const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const _ = require('lodash')

const resourceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    permissions: {
        type: Schema.Types.Mixed,
        required: true,
        default: {},
        validate(value) {
            if (!_.isObject(value)) {
                throw new Error('Permission must be require.')
            }
        },
    }
},{
    timestamps:true,
    minimize: false
})

resourceSchema.options.toJSON = {
    transform: function (doc, resource, options) {
        resource.id = resource._id
        delete resource._id
        delete resource.__v
        return resource
    }
}

const resources = mongoose.model('Resource', resourceSchema, 'resource')

module.exports = resources