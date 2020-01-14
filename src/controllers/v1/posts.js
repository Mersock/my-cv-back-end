import _ from 'lodash'
import Post from '../../models/posts';
import { setOptions, queryLike, querySort, queryEquals } from '../../utils/paginate'
import { responseWithError, responseWithCustomError, responseCollection } from '../../utils/response'



export const list = async (req, res) => {
    try {
        let { page, limit } = req.query
        let { body, title, slug, author } = req.query
        let { sortBy, sortType } = req.query
        let filter = queryEquals({ author })
        let filterLike = queryLike({ body, title, slug })
        let sort = querySort(sortBy, sortType)
        let post = await Post.paginate(_.merge(filterLike, filter), setOptions(page, limit, sort))
        res.status(200).json(post)
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
        let post = await Post.findById(_id)
        if (!post) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(post))
    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }
}

export const create = async (req, res) => {
    let post = new Post(req.body)
    try {
        await post.save()
        res.status(201).send(responseCollection(post))
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
        let post = await Post.findOneAndUpdate({ _id }, { $set: req.body }, { new: true, useFindAndModify: false })
        if (!post) {
            return res.status(404).send(responseWithCustomError('Not Found.', 404))
        }
        res.status(200).send(responseCollection(post))
    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send(responseWithError(errors, 400))
    }

}

export const destroy = async (req, res) => {
    let _id = req.params.id
    try {
        let post = await Post.findByIdAndDelete(_id)
        if (!post) {
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