const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const resourceSchema = new Schema({
    resource: {
        type: String,
        required: true,
    },
    permissions: {
        type: [{}],
        required: true
    }
})

const resources = mongoose.model('Resource', resourceSchema, 'resource')

module.exports = resources