import _ from 'lodash'
import Role from '../../models/roles';
import { setOptions, queryLike, querySort } from '../../utils/paginate'
import { responseWithCustomError, responseWithCustomError } from '../../utils/response'

export const list = async (req, res) => {
    try {
        const { page, limit } = req.query
        const { name } = req.query
        const { sortBy, sortType } = req.query
        const filterLike = queryLike({ name })
        const sort = querySort(sortBy, sortType)
        const roles = await Role.paginate(_.merge(filterLike), setOptions(page, limit, sort))
        res.status(200).json(roles)
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }
}

export const show = async (req, res) => {
    const _id = req.params.id
    try {
        const roles = await Role.findById(_id)
        if (!roles) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(roles))
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }
}

export const update = async (req, res) => {
    const _id = req.params.id
    try {
        const roles = await Role.findOneAndUpdate({ _id }, { $set: req.body }, { new: true, useFindAndModify: false })
        if (!roles) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(roles))
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }

}

export const create = async (req, res) => {
    const roles = new Role(req.body)
    try {
        await roles.save()
        res.status(201).send(responseCollection(roles))
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }
}

export const destroy = async (req, res) => {
    const _id = req.params.id
    try {
        const roles = await Role.findByIdAndDelete(_id)
        if (!roles) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(204).send()
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }
}

export const listWithPermission = async (req, res) => {
    try {
        const { page, limit } = req.query
        const { name } = req.query
        const { sortBy, sortType } = req.query
        const filterLike = queryLike({ name })
        const sort = querySort(sortBy, sortType)
        const roles = await Role.paginate(_.merge(filterLike), setOptions(page, limit, sort, 'permissions'))
        res.status(200).json(roles)
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }
}

export const showWithPermissions = async (req, res) => {
    const _id = req.params.id
    try {
        return await Role.findOne({ _id })
            .populate({
                path: 'permissions',
            })
            .exec(function (err, permissions) {
                if (!permissions) {
                    return res.status(404).send(responseWithCustomError('Not Found.', 404))
                }
                res.status(200).json(responseCollection(permissions))
            })
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }
}
