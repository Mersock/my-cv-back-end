const mongoose = require('mongoose');
const {validatetions} = require('../utils/validations')
const { body } = require('express-validator')

exports.validateCreate = validatetions([
    body('username').not().isEmpty().withMessage('username must be require.'),
    body('password').not().isEmpty().withMessage('password must be require.')
                    .isLength({ min: 6 }).withMessage('password must be least 6 chars long.')
]);

