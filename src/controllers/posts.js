const Post = require('../models/posts');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;


exports.list = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json({ data: post })
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send({
            statusCode: 400,
            errors
        })
    }
}

exports.show = async (req, res) => {
    const _id = req.params.id

    if (!ObjectId.isValid(_id)) {
        return res.status(404).send({
            statusCode: 404,
            message: 'Not Found.'
        })
    }

    try {
        const posts = await Post.findById(_id)
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
        const errors = []
        errors.push(error)
        res.status(400).send({
            statusCode: 400,
            errors
        })
    }
}

exports.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
        return res.status(422).json({ errors: extractedErrors })
    }

    req.body.author = new mongoose.Types.ObjectId()

    const post = new Post(req.body)
    try {
        await post.save();
        res.status(201).json(post)
    } catch (error) {
        const errors = []
        errors.push(error)
        res.status(400).send({
            statusCode: 400,
            errors
        })
    }
}

exports.update = async (req, res) => {
    const _id = req.params.id
    const postColumn = {}

    if (!ObjectId.isValid(_id)) {
        return res.status(404).send({
            statusCode: 404,
            message: 'Not Found.'
        })
    }

    const postBody = await Post.findById(_id)
    postColumn.body = req.body.body == undefined || req.body.body == '' ? postBody.body : req.body.body
    postColumn.author = req.body.author == undefined || req.body.author == '' ? postBody.author : new mongoose.Types.ObjectId()
    postColumn.title = req.body.title == undefined || req.body.title == '' ? postBody.title : req.body.title
    try {
        const posts = await Post.findByIdAndUpdate(_id, { $set: postColumn }, { new: true, runValidators: true })
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send({
            statusCode: 400,
            errors
        })
    }
}

exports.delete = async (req, res) => {
    const _id = req.params.id

    if (!ObjectId.isValid(_id)) {
        return res.status(404).send({
            statusCode: 404,
            message: 'Not Found.'
        })
    }

    try {
        const posts = await Post.findByIdAndDelete(_id)
        if (!posts) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found.'
            })
        }
        res.status(204).send()

    } catch (error) {
        console.log(error)
        const errors = []
        errors.push(error)
        res.status(400).send({
            statusCode: 400,
            errors
        })
    }
}