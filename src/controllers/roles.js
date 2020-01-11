import _ from 'lodash'
import Role from '../models/roles';
import { setOptions, queryLike, querySort } from '../utils/paginate'
import { responseCollection, responseWithError, responseWithCustomError } from '../utils/response'

export const list = async (req, res) => {
    try {
        let { page, limit } = req.query
        let { name } = req.query
        let { sortBy, sortType } = req.query
        let filterLike = queryLike({ name })
        let sort = querySort(sortBy, sortType)
        let roles = await Role.paginate(_.merge(filterLike), setOptions(page, limit, sort))
        res.status(200).json(roles)
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
