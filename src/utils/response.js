exports.responseWithError = (error, code) => {
    const errors = []
    errors.push(error)
    return {
        statusCode: code,
        errors
    }
}

exports.responseWithValidations = (error,code) => {
    
}