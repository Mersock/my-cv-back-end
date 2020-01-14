import _ from 'lodash'
import Permission from '../../models/permissions';
import { setOptions, queryLike, querySort } from '../../utils/paginate'
import { responseCollection, responseWithError, responseWithCustomError } from '../../utils/response'

export const list = async (req, res) => {
    try {
        let { page, limit } = req.query
        let { name } = req.query
        let { sortBy, sortType } = req.query
        let filterLike = queryLike({ name })
        let sort = querySort(sortBy, sortType)
        let permissions = await Permission.paginate(_.merge(filterLike), setOptions(page, limit, sort))
        res.status(200).json(permissions)
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
        let permissions = await Permission.findById(_id)
        if (!permissions) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(permissions))
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
        const permissions = await Permission.findOneAndUpdate({ _id }, { $set: req.body }, { new: true, useFindAndModify: false })
        if (!permissions) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(permissions))
    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }

}

export const create = async (req, res) => {
    let permissions = new Permission(req.body)
    try {
        await permissions.save()
        res.status(201).send(responseCollection(permissions))
    } catch (error) {
        res.send(error)
    }
}

export const destroy = async (req, res) => {
    let _id = req.params.id
    try {
        let permissions = await Permission.findByIdAndDelete(_id)
        if (!permissions) {
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