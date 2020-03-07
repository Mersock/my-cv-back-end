import _ from 'lodash'

export const responseWithError = (msg, code) => {
    return {
        'errors': {
            statusCode: code,
            message: msg
        }
    }
}

export const responseWithCustomError = (msg, code) => {
    return {
        'errors': {
            statusCode: code,
            message: msg
        }
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