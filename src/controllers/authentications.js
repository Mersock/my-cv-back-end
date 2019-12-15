const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const User = require('../models/users')
const { responseWithCustomError,responseValidateError } = require('../utils/response')
const client = require('../utils/authentications')

exports.login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).send(responseValidateError(errors))
    }
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        const isMatch = bcrypt.compareSync(password, user.password)
        if (isMatch) {
            const accessToken = client.signOption(user)
            const refreshToken = client.saveRefreshToken(user)
            return res.status(200).send({
                accessToken,
                refreshToken
            })
        }
        res.status(401).send(responseWithCustomError('Unauthorized.', 401))
    } catch (error) {
        console.log(error)
        res.status(401).send(responseWithCustomError('Unauthorized.', 401))
    }
}

exports.refreshToken = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).send(responseValidateError(errors))
    }
    try {
        const { refreshToken, userId } = req.body
        const userOject = await client.getUserFromRefreshToken(userId, refreshToken)
        const user = JSON.parse(userOject)
        const accessToken = client.signOption(user)
        res.status(200).send({
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(401).send(responseWithCustomError('Unauthorized.', 401))
    }
}

exports.logout = async (req, res) => {
    try {
        const { userId, refreshToken } = req.body
        const userOject = await client.getUserFromRefreshToken(userId, refreshToken)
        const user = JSON.parse(userOject)
        if (user.id) {
            client.destroyToken(user.id, refreshToken)
            return res.status(204).send()
        }
        res.status(401).send(responseWithCustomError('Unauthorized.', 401))

    } catch (error) {
        res.status(401).send(responseWithCustomError('Unauthorized.', 401))
    }
}
