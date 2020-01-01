import jwt from 'jsonwebtoken'
import client from '../db/redis'
import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import randtoken from 'rand-token'

const privateKey = fs.readFileSync(path.join(__dirname, '../keys') + '/private.key', 'utf8');

export const signOption = (user) => {
    let permisisons = responsePermisisons(user.permissions)
    let payload = {
        id: user._id,
        username: user.username,
        permissions: permisisons
    }
    let exp = Math.floor(Date.now() / 1000) + (60 * 60 * 4)
    let signOptions = {
        expiresIn: exp,
        algorithm: "RS256"
    };
    return jwt.sign(payload, privateKey, signOptions)
}

export const saveRefreshToken = user => {
    let refreshToken = randtoken.uid(256)
    let exp = (60 * 60 * 24)
    client.set(`refreshToken_${user._id}_${refreshToken}`, JSON.stringify(user), 'EX', exp)
    return refreshToken
}

export const getUserFromRefreshToken = (userId, refreshToken) => {
    let user = client.getAsync(`refreshToken_${userId}_${refreshToken}`).then(function (res) {
        return res
    })
    return user
}

export const destroyToken = (userId, refreshToken) => {
    client.del(`refreshToken_${userId}_${refreshToken}`);
}

export const responsePermisisons = permisisons => {
    return _.map(permisisons, 'name')
}