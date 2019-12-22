const Resource = require('../models/resoureces');
const { responseCollection, responseWithError, responseWithCustomError } = require('../utils/response')

exports.list = async (req, res) => {
    try {
        const resource = await Resource.find()
        res.status(200).json(responseCollection(resource))
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
        const resource = await Resource.findById(_id)
        if (!resource) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(resource))
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
        const resource = await Resource.findOneAndUpdate({_id}, { $set: req.body }, { new: true, useFindAndModify: false })
        if (!resource) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(resource))
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }

}

module.exports.create = async (req, res) => {
    const resource = new Resource(req.body)
    try {
        await resource.save()
        res.status(201).send(responseCollection(resource))
    } catch (error) {
        res.send(error)
    }
}

exports.delete = async (req, res) => {
    const _id = req.params.id
    try {
        const resource = await Resource.findByIdAndDelete(_id)
        if (!resource) {
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