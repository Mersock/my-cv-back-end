import _ from 'lodash'
import randtoken from 'rand-token'
import Client from '../../models/client';
import { setOptions, queryLike, querySort, queryEquals } from '../../utils/paginate'
import { responseWithError, responseWithCustomError, responseCollection } from '../../utils/response'



export const list = async (req, res) => {
    try {
        let { page, limit } = req.query
        let { sortBy, sortType } = req.query
        let { name, active } = req.query
        let filter = queryEquals({ active })
        let filterLike = queryLike({ name })
        let sort = querySort(sortBy, sortType)
        let client = await Client.paginate(_.merge(filterLike, filter), setOptions(page, limit, sort))
        res.status(200).json(client)
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
        let client = await Client.findById(_id)
        if (!client) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(client))
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
        let client = await Client.findOneAndUpdate({ _id }, { $set: req.body }, { new: true, useFindAndModify: false })
        if (!client) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(client))
    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

export const create = async (req, res) => {
    req.body.secret = randtoken.uid(16)
    let client = new Client(req.body)
    try {
        await client.save()
        res.status(201).send(responseCollection(client))
    } catch (error) {
        res.send(error)
    }
}

export const destroy = async (req, res) => {
    let _id = req.params.id
    try {
        let client = await Client.findByIdAndDelete(_id)
        if (!client) {
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


