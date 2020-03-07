import { validationResult } from 'express-validator'
import { responseValidateError } from '../utils/response'

export const validatetions = validations => async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    let errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    let extractedErrors = {}
    errors.array().map(err => {
        if (Array.isArray(extractedErrors[err.param])) {
            extractedErrors[err.param].push(err.msg)
        } else {
            extractedErrors[err.param] = [err.msg]
        }
    })

    return res.status(422).send(responseValidateError('Unprocessable Entity', 422, extractedErrors))
};