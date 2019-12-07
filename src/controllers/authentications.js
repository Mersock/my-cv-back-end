const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const randtoken = require('rand-token')
const User = require('../models/users')
const { responseWithCustomError } = require('../utils/response')
const privateKey = fs.readFileSync(path.join(__dirname, '../keys') + '/private.key', 'utf8');

exports.login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
        return res.status(401).send(responseWithCustomError('Unauthorized', 401))
    }
    const isMatch = bcrypt.compareSync(password, user.password)
    if (isMatch) {
        const payload = {
            id: user._id,
            username: user.username
        }
        const signOptions = {
            issuer: 'my-cv',
            // subject: 'some@user.com',
            audience: 'http://my-cv-back-end',
            expiresIn: 300,
            algorithm: "RS256"
        };
        const token = jwt.sign(payload, privateKey, signOptions)
        const refreshToken = randtoken.uid(256)
        return res.status(200).send({
            token,
            refreshToken
        })
    }
    return res.status(401).send(responseWithCustomError('Unauthorized', 401))
}