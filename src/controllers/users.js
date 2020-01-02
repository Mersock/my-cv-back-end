import User from '../models/users'
import { responseWithError, responseWithCustomError, responseCollection } from '../utils/response'

export const list = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(responseCollection(user))
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

export const listWithPermission = async (req, res) => {
    try {
        return await User.find()
            .populate({
                path: 'permissions',
                select: ['name'],
            })
            .exec(function (err, permissions) {
                res.status(200).json(responseCollection(permissions))
            })
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

export const showWithPermissions = async (req, res) => {
    const _id = req.params.id
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
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}