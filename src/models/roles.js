import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    permissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Permission'
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

roleSchema.plugin(mongoosePaginate)

const Role = mongoose.model('Role', roleSchema, 'roles')

export default Role