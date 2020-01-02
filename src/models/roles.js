import mongoose from 'mongoose'

const Schema = mongoose.Schema

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
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

export default Role