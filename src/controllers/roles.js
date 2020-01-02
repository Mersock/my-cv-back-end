import Role from '../models/roles';
import { responseCollection, responseWithError, responseWithCustomError } from '../utils/response'

export const list = async (req, res) => {
    try {
        let roles = await Role.find()
        res.status(200).json(responseCollection(roles))
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
        let roles = await Role.findById(_id)
        if (!roles) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(roles))
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
        let roles = await Role.findOneAndUpdate({ _id }, { $set: req.body }, { new: true, useFindAndModify: false })
        if (!roles) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(roles))
    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }

}

export const create = async (req, res) => {
    let roles = new Role(req.body)
    try {
        await roles.save()
        res.status(201).send(responseCollection(roles))
    } catch (error) {
        res.send(error)
    }
}

export const destroy = async (req, res) => {
    let _id = req.params.id
    try {
        let roles = await Role.findByIdAndDelete(_id)
        if (!roles) {
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
