const User = require('../models/users')
const ObjectId = require('mongoose').Types.ObjectId
const { responseWithError, responseWithCustomError, responseCollection } = require('../utils/response')

exports.list = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(responseCollection(user))
    } catch (error) {
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

exports.show = async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(user))
    } catch (error) {
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

exports.create = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(responseCollection(user))
    } catch (error) {
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

exports.update = async (req, res) => {
    res.send(req.body)
}

exports.delete = async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(204).send()
    } catch (error) {
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}