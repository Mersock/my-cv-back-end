import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'


const Schema = mongoose.Schema
const permissionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

permissionSchema.options.toJSON = {
    transform: function (doc, permission, options) {
        permission.id = permission._id
        delete permission._id
        delete permission.__v
        return permission
    }
}

permissionSchema.plugin(mongoosePaginate)

const Permission = mongoose.model('Permission', permissionSchema, 'permissions')

export default Permission