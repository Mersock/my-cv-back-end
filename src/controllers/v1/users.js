import _ from 'lodash'
import User from '../../models/users'
import { setOptions, queryLike, querySort } from '../../utils/paginate'
import { responseWithError, responseWithCustomError, responseCollection } from '../../utils/response'

export const list = async (req, res) => {
    try {
        const { page, limit } = req.query
        const { username, firstname, lastname } = req.query
        const { sortBy, sortType } = req.query
        const filterLike = queryLike({ username, firstname, lastname })
        const sort = querySort(sortBy, sortType)
        const user = await User.paginate(_.merge(filterLike), setOptions(page, limit, sort))
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

export const show = async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(user))
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

export const create = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(responseCollection(user))
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

export const update = async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findOneAndUpdate({ _id }, { $set: req.body }, { new: true, useFindAndModify: false })
        if (!user) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(user))
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }

}

export const destroy = async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(204).send()
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

export const listWithRoles = async (req, res) => {
    try {
        const { page, limit } = req.query
        const { username, firstname, lastname } = req.query
        const { sortBy, sortType } = req.query
        const filterLike = queryLike({ username, firstname, lastname })
        const sort = querySort(sortBy, sortType)
        const user = await User.paginate(_.merge(filterLike), setOptions(page, limit, sort, 'roles'))
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

export const showWithRoles = async (req, res) => {
    const _id = req.params.id
    try {
        return await User.findOne({ _id })
            .populate({
                path: 'roles',
            })
            .exec(function (err, roles) {
                if (!roles) {
                    return res.status(404).send(responseWithCustomError('Not Found.', 404))
                }
                res.status(200).json(responseCollection(roles))
            })
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}