import { validationResult } from 'express-validator'

export const validatetions = validations => async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    let errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    let extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    return res.status(422).json({ errors: extractedErrors })
};