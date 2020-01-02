import { body } from 'express-validator'
import { validatetions } from '../utils/validations'

export const validateLogin = validatetions([
    body('username').notEmpty().withMessage('username must be require.')
        .isLength({ min: 4 }).withMessage('username must be least 4 chars.'),
    body('password').notEmpty().withMessage('password must be require.')
        .isLength({ min: 6 }).withMessage('password must be least 6 chars long.'),
])

export const validateRefreshToken = validatetions([
    body('userId').isMongoId().withMessage('ID is invalid value.'),
    body('refreshToken').notEmpty().withMessage('refreshToken must be require.')
])