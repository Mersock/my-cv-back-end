const jwt = require('jsonwebtoken')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const randtoken = require('rand-token')
const client = require('../db/redis')
const privateKey = fs.readFileSync(path.join(__dirname, '../keys') + '/private.key', 'utf8');


exports.signOption = (user) => {
    const roles = this.responstRoles(user.roles)
    const payload = {
        id: user._id,
        username: user.username,
        roles: roles
    }
    const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 4)
    const signOptions = {
        expiresIn: exp,
        algorithm: "RS256"
    };
    return jwt.sign(payload, privateKey, signOptions)
}

exports.saveRefreshToken = (user) => {
    const refreshToken = randtoken.uid(256)
    const exp = (60 * 60 * 24)
    client.set(`refreshToken_${user._id}_${refreshToken}`, JSON.stringify(user), 'EX', exp)
    return refreshToken
}

exports.getUserFromRefreshToken = (userId, refreshToken) => {
    const user = client.getAsync(`refreshToken_${userId}_${refreshToken}`).then(function (res) {
        return res
    })
    return user
}

exports.destroyToken = (userId, refreshToken) => {
    client.del(`refreshToken_${userId}_${refreshToken}`);
}

exports.responstRoles = roles => {
    const rolesObj = JSON.parse(JSON.stringify(roles));
    return _.forEach(rolesObj, (value, key) => {
        _.unset(value, 'id')
        _.unset(value, `resources[${key}].id`)
    })
}
