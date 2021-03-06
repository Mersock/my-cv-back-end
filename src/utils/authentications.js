import jwt from 'jsonwebtoken'
import client from '../db/redis'
import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import randtoken from 'rand-token'

const privateKey = fs.readFileSync(path.join(__dirname, '../keys') + '/private.key', 'utf8');

export const signOption = (user) => {
    const permisisons = responsePermisisons(user.roles)
    const payload = {
        id: user._id,
        username: user.username,
        permissions: permisisons
    }
    const exp = '1h'
    const signOptions = {
        expiresIn: exp,
        algorithm: "RS256"
    };
    return jwt.sign(payload, privateKey, signOptions)
}


export const saveRefreshToken = user => {
    const refreshToken = randtoken.uid(128)
    const exp = (60 * 60 * 24)
    client.set(`refreshToken_${user._id}_${refreshToken}`, JSON.stringify(user), 'EX', exp)
    return refreshToken
}

export const getUserFromRefreshToken = (userId, refreshToken) => {
    const user = client.getAsync(`refreshToken_${userId}_${refreshToken}`).then(function (res) {
        return res
    })
    return user
}

export const destroyRefreshToken = (userId, refreshToken) => {
    client.del(`refreshToken_${userId}_${refreshToken}`);
}


export const responsePermisisons = roles => {
    const rolesList = _.map(roles, 'name')
    let permisisons = []
    _.forEach(roles, function (role) {
        permisisons = role.permissions.map(permission => permission)
    })
    const permisisonsList = _.map(permisisons, 'name')
    if (!_.isEmpty(permisisonsList)) {
        return [...rolesList, ...permisisonsList]
    }
    return rolesList
}