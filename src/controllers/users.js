const User = require('../models/users')
const ObjectId = require('mongoose').Types.ObjectId

exports.list = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json({ data: user })
    } catch (error) {
        const errors = []
        errors.push(error)
        res.status(400).send({
            statusCode: 400,
            errors
        })
    }
}

exports.show = async (req, res) => {
    const _id = req.params.id

    if (!ObjectId.isValid(_id)) {
        return res.status(404).send({
            statusCode: 404,
            message: 'Not Found.'
        })
    }
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found.'
            })
        }
        res.status(200).send({ data: user })
    } catch (error) {
        const errors = []
        errors.push(error)
        res.status(400).send({
            statusCode: 400,
            errors
        })
    }
}

exports.create = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        const errors = []
        errors.push(error)
        res.status(400).send({
            statusCode: 400,
            errors
        })
    }
}

exports.update = async (req, res) => {
    res.send(req.body)
}

exports.delete = async (req, res) => {
    const _id = req.params.id

    if (!ObjectId.isValid(_id)) {
        return res.status(404).send({
            statusCode: 404,
            message: 'Not Found.'
        })
    }

    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found.'
            })
        }
        res.status(204).send()
    } catch (error) {
        const errors = []
        errors.push(error)
        res.status(400).send({
            statusCode: 400,
            errors
        })
    }
}