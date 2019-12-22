const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    resources: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resource'
        }
    ]
}, {
    timestamps: true
})

roleSchema.options.toJSON = {
    transform: function (doc, role, options) {
        role.id = role._id
        delete role._id
        delete role.__v
        return role
    }
}

const Role = mongoose.model('Role', roleSchema, 'roles')

module.exports = Role