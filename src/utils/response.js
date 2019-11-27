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

exports.responseCollection = (collection) => {
    return {
        data:collection
    }
}