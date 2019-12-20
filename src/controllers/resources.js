const Resource = require('../models/resoureces');
const { responseCollection } = require('../utils/response')

module.exports.create = async (req, res) => {
    const resource = new Resource(req.body)
    try {
        await resource.save()
        res.status(201).send(responseCollection(resource))
    } catch (error) {
        res.send(error)
    }
}