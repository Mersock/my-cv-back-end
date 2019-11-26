const User = require('../models/users')

exports.list = async (req, res) => {
    res.send('xxx')
}

exports.show = async (req, res) => {
    res.send(req.params.id)
}

exports.create = async (req, res) => {
    res.send(req.body)
}

exports.update = async (req, res) => {
    res.send(req.body)
}

exports.delete = async (req, res) => {
    res.send(req.params.id)
}