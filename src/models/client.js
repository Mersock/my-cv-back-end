import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema
const clientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

clientSchema.options.toJSON = {
    transform: function (doc, client, options) {
        client.id = client._id
        delete client._id
        delete client.__v
        return client
    }
}

clientSchema.plugin(mongoosePaginate)

const Cleint = mongoose.model('Client', clientSchema, 'client')

export default Cleint