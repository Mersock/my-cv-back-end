import mongoose from 'mongoose'
import Post from '../models/posts';
import { validationResult } from 'express-validator';

const ObjectId = mongoose.Types.ObjectId;

export const list = async (req, res) => {
    try {
        let post = await Post.find()
        res.status(200).json({ data: post })
    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send({
            statusCode: 400,
            errors
        })
    }
}

export const show = async (req, res) => {
    let _id = req.params.id

    if (!ObjectId.isValid(_id)) {
        return res.status(404).send({
            statusCode: 404,
            message: 'Not Found.'
        })
    }

    try {
        let posts = await Post.findById(_id)
        if (!posts) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found.'
            })
        }

        res.json({
            data: posts
        })
    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send({
            statusCode: 400,
            errors
        })
    }
}

export const create = async (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        let extractedErrors = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
        return res.status(422).json({ errors: extractedErrors })
    }

    req.body.author = new mongoose.Types.ObjectId()

    let post = new Post(req.body)
    try {
        await post.save();
        res.status(201).json(post)
    } catch (error) {
        let errors = []
        errors.push(error)
        res.status(400).send({
            statusCode: 400,
            errors
        })
    }
}

export const update = async (req, res) => {
    let _id = req.params.id
    let postColumn = {}

    if (!ObjectId.isValid(_id)) {
        return res.status(404).send({
            statusCode: 404,
            message: 'Not Found.'
        })
    }

    let postBody = await Post.findById(_id)
    postColumn.body = req.body.body == undefined || req.body.body == '' ? postBody.body : req.body.body
    postColumn.author = req.body.author == undefined || req.body.author == '' ? postBody.author : new mongoose.Types.ObjectId()
    postColumn.title = req.body.title == undefined || req.body.title == '' ? postBody.title : req.body.title
    try {
        let posts = await Post.findByIdAndUpdate(_id, { $set: postColumn }, { new: true, runValidators: true })
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send({
            statusCode: 400,
            errors
        })
    }
}

export const destroy = async (req, res) => {
    let _id = req.params.id

    if (!ObjectId.isValid(_id)) {
        return res.status(404).send({
            statusCode: 404,
            message: 'Not Found.'
        })
    }

    try {
        let posts = await Post.findByIdAndDelete(_id)
        if (!posts) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found.'
            })
        }
        res.status(204).send()

    } catch (error) {
        console.log(error)
        let errors = []
        errors.push(error)
        res.status(400).send({
            statusCode: 400,
            errors
        })
    }
}