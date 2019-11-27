const { validationResult } = require('express-validator')

exports.validatetions = validations => async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    console.log(errors);
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    return res.status(422).json({ errors: extractedErrors })
};