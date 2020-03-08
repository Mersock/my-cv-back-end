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

export const responseValidateError = (msg, code, errors) => {
    return {
        'errors': {
            statusCode: code,
            message: msg,
            'errors': errors
        }
    }
}