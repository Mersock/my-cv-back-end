const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const randtoken = require('rand-token')
const client = require('../db/redis')
const privateKey = fs.readFileSync(path.join(__dirname, '../keys') + '/private.key', 'utf8');


exports.signOption = (user) => {
    const payload = {
        id: user._id,
        username: user.username
    }
    const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 4)
    // issuer — Software organization who issues the token.
    // subject — Intended user of the token.
    // audience — Basically identity of the intended recipient of the token..
    // expiresIn — Expiration time after which the token will be invalid.
    // algorithm — Encryption algorithm to be used to protect the token.
    const signOptions = {
        issuer: 'my-cv',
        subject: 'some@user.com',
        audience: 'http://my-cv-back-end',
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

exports.getUserFromRefreshToken =  (userId,refreshToken) => {
    const user = client.getAsync(`refreshToken_${userId}_${refreshToken}`).then(function(res){
            return res
    })
    return user
}
