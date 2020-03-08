import _ from 'lodash'
import randtoken from 'rand-token'
import Client from '../../models/client';
import { setOptions, queryLike, querySort, queryEquals } from '../../utils/paginate'
import { responseWithCustomError, responseCollection } from '../../utils/response'



export const list = async (req, res) => {
    try {
        const { page, limit } = req.query
        const { sortBy, sortType } = req.query
        const { name, active } = req.query
        const filter = queryEquals({ active })
        const filterLike = queryLike({ name })
        const sort = querySort(sortBy, sortType)
        const client = await Client.paginate(_.merge(filterLike, filter), setOptions(page, limit, sort))
        res.status(200).json(client)
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }
}

export const show = async (req, res) => {
    const _id = req.params.id
    try {
        const client = await Client.findById(_id)
        if (!client) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(client))
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }
}

export const update = async (req, res) => {
    const _id = req.params.id
    try {
        const client = await Client.findOneAndUpdate({ _id }, { $set: req.body }, { new: true, useFindAndModify: false })
        if (!client) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(client))
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }
}

export const create = async (req, res) => {
    req.body.secret = randtoken.uid(16)
    const client = new Client(req.body)
    try {
        await client.save()
        res.status(201).send(responseCollection(client))
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }
}

export const destroy = async (req, res) => {
    const _id = req.params.id
    try {
        const client = await Client.findByIdAndDelete(_id)
        if (!client) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(204).send()
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }
}


