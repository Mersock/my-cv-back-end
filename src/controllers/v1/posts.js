import _ from 'lodash'
import Post from '../../models/posts';
import { setOptions, queryLike, querySort, queryEquals } from '../../utils/paginate'
import { responseWithCustomError, responseCollection } from '../../utils/response'



export const list = async (req, res) => {
    try {
        const { page, limit } = req.query
        const { body, title, slug, author } = req.query
        const { sortBy, sortType } = req.query
        const filter = queryEquals({ author })
        const filterLike = queryLike({ body, title, slug })
        const sort = querySort(sortBy, sortType)
        const post = await Post.paginate(_.merge(filterLike, filter), setOptions(page, limit, sort))
        res.status(200).json(post)
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }
}

export const show = async (req, res) => {
    const _id = req.params.id
    try {
        const post = await Post.findById(_id)
        if (!post) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(post))
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }
}

export const create = async (req, res) => {
    const post = new Post(req.body)
    try {
        await post.save()
        res.status(201).send(responseCollection(post))
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }
}

export const update = async (req, res) => {
    const _id = req.params.id
    try {
        const post = await Post.findOneAndUpdate({ _id }, { $set: req.body }, { new: true, useFindAndModify: false })
        if (!post) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(post))
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }

}

export const destroy = async (req, res) => {
    const _id = req.params.id
    try {
        const post = await Post.findByIdAndDelete(_id)
        if (!post) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(204).send()
    } catch (error) {
        res.status(400).send(responseWithCustomError('Bad Request.', 400))
    }
}