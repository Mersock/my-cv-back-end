const _ = require('lodash')

exports.responseWithError = (error, code) => {
    const errors = []
    errors.push(error)
    return {
        statusCode: code,
        errors
    }
}

exports.responseWithCustomError = (msg, code) => {
    return {
        statusCode: code,
        message: msg
    }
}

exports.responseCollection = (collection, exept = []) => {

    if (_.isArray(collection) > 0) {
        let filterCollection = _.map(collection, (obj) => {
            return _.omit(obj.toObject(), exept)
        })
        return {
            data: filterCollection
        }
    }
    
    let filterCollection = _.omit(collection.toObject(), exept)
    return {
        data: filterCollection
    }
}