const Role = require('../models/roles');
const { responseCollection, responseWithError, responseWithCustomError } = require('../utils/response')

exports.list = async (req, res) => {
    try {
        const roles = await Role.find()
        res.status(200).json(responseCollection(roles))
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

exports.show = async (req, res) => {
    const _id = req.params.id
    try {
        const roles = await Role.findById(_id)
        if (!roles) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(roles))
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

exports.update = async (req, res) => {
    const _id = req.params.id
    try {
        const roles = await Role.findOneAndUpdate({ _id }, { $set: req.body }, { new: true, useFindAndModify: false })
        if (!roles) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(roles))
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }

}

module.exports.create = async (req, res) => {
    const roles = new Role(req.body)
    try {
        await roles.save()
        res.status(201).send(responseCollection(roles))
    } catch (error) {
        res.send(error)
    }
}

exports.delete = async (req, res) => {
    const _id = req.params.id
    try {
        const roles = await Role.findByIdAndDelete(_id)
        if (!roles) {
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

exports.listWithResource = async (req, res) => {
    try {
        return await Role.find()
            .populate('resources', ['name', 'permissions'])
            .exec(function (err, roles) {
                res.status(200).json(responseCollection(roles))
            })
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}
exports.showWithResource = async (req, res) => {
    const _id = req.params.id
    try {
        return await Role.findOne({ _id })
            .populate('resources', ['name', 'permissions'])
            .exec(function (err, roles) {
                res.status(200).json(responseCollection(roles))
            })
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}