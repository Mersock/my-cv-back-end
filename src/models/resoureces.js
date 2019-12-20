const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const resourceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    permissions: {
        type: Object,
        required: true
    }
})

const resources = mongoose.model('Resource', resourceSchema, 'resource')

module.exports = resources