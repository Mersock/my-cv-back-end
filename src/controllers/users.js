import _ from 'lodash'
import User from '../models/users'
import { setOptions, queryLike, querySort } from '../utils/paginate'
import { responseWithError, responseWithCustomError, responseCollection } from '../utils/response'

export const list = async (req, res) => {
    try {
        let { page, limit } = req.query
        let { username, firstname, lastname } = req.query
        let { sortBy, sortType } = req.query
        let filterLike = queryLike({ username, firstname, lastname })
        let sort = querySort(sortBy, sortType)
        let user = await User.paginate(_.merge(filterLike), setOptions(page, limit, sort))
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

export const show = async (req, res) => {
    let _id = req.params.id
    try {
        let user = await User.findById(_id)
        if (!user) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(user))
    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

export const create = async (req, res) => {
    let user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(responseCollection(user))
    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

export const update = async (req, res) => {
    let _id = req.params.id
    try {
        let user = await User.findOneAndUpdate({ _id }, { $set: req.body }, { new: true, useFindAndModify: false })
        if (!user) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(user))
    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }

}

export const destroy = async (req, res) => {
    let _id = req.params.id
    try {
        let user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(204).send()
    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

export const listWithPermission = async (req, res) => {
    try {
        let { page, limit } = req.query
        let { username, firstname, lastname } = req.query
        let { sortBy, sortType } = req.query
        let filterLike = queryLike({ username, firstname, lastname })
        let sort = querySort(sortBy, sortType)
        let user = await User.paginate(_.merge(filterLike), setOptions(page, limit, sort, 'permissions'))
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

export const showWithPermissions = async (req, res) => {
    let _id = req.params.id
    try {
        return await User.findOne({ _id })
            .populate({
                path: 'permissions',
                select: ['name'],
            })
            .exec(function (err, permissions) {
                if (!permissions) {
                    return res.status(404).send(responseWithCustomError('Not Found.', 404))
                }
                res.status(200).json(responseCollection(permissions))
            })
    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}