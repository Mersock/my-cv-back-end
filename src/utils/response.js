import _ from 'lodash'

export const responseWithError = (error, code) => {
    let errors = []
    errors.push(error)
    return {
        statusCode: code,
        errors
    }
}

export const responseWithCustomError = (msg, code) => {
    return {
        statusCode: code,
        message: msg
    }
}

export const responseCollection = (collection) => {
    return {
        data: collection
    }
}

export const responseValidateError = (errors) => {
    let extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    return {
        errors: extractedErrors
    }
}