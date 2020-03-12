import { body, query, param } from 'express-validator';
import { validatetions } from '../utils/validations'
import Posts from '../models/posts'

export const validateList = validatetions([
    query('limit').optional().isNumeric().withMessage('limit must be numeric.'),
    query('page').optional().isNumeric().withMessage('page must be numeric.'),
    query('sortType').optional().isIn(['asc', 'desc']).withMessage('sortType can be either asc or desc.'),
    query('author').optional().isMongoId()
])


export const validateCreate = validatetions([
    body('title').notEmpty().withMessage('must be not empty.')
        .isLength({ min: 1, max: 1000 }).withMessage('must be maximum 1000 chars.'),
    body('author').isMongoId()
        .not().isEmpty().withMessage('must be not empty.'),
    body('body').notEmpty().withMessage('must be not empty.')
        .isLength({ min: 1, max: 10000 }).withMessage('must be maximum 10000 chars.'),
    body('slug').notEmpty().withMessage('must be not empty.')
        .custom(async slug => {
            const posts = await Posts.findOne({ slug })
            if (posts) {
                throw new Error(`slug name ${slug} has been taken.`)
            }
        })
        .matches(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/).withMessage('slug invalid format.'),
    body('imagesUrl').optional().isURL().withMessage('imagesUrl must be url.')
])

export const validateUpdate = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.'),
    body('title').optional().notEmpty().withMessage('must be not empty.')
        .isLength({ min: 1, max: 1000 }).withMessage('must be maximum 1000 chars.'),
    body('author').optional()
        .isMongoId()
        .not().isEmpty().withMessage('must be not empty.'),
    body('body').optional()
        .notEmpty().withMessage('must be not empty.')
        .isLength({ min: 1, max: 10000 }).withMessage('must be maximum 10000 chars.'),
    body('slug').optional()
        .notEmpty().withMessage('must be not empty.')
        .custom(async (value, { req }) => {
            const id = req.params.id
            const posts = await Posts.find({ _id: { $ne: id }, slug: { $in: [value] } })
            if (posts.length > 0) {
                throw new Error(`slug name ${slug} has been taken.`)
            }
        })
        .matches(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/).withMessage('slug invalid format.'),
    body('imagesUrl').optional().isURL().withMessage('imagesUrl must be url.')
    
])

export const validateShow = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])

export const validateDelete = validatetions([
    param('id').isMongoId().withMessage('ID is invalid value.')
])

