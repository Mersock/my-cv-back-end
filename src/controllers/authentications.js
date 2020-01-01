import bcrypt from 'bcryptjs'
import _ from 'lodash'
import { responseWithCustomError } from '../utils/response'
import { signOption, saveRefreshToken, getUserFromRefreshToken, destroyToken } from '../utils/authentications'
import User from '../models/users'
import client from '../db/redis'

export const login = async (req, res) => {
    try {
        let { username, password } = req.body
        return User.findOne({ username }).populate({
            path: 'permissions',
        }).exec(function (err, user) {
            let isMatch = bcrypt.compareSync(password, user.password)
            if (isMatch) {
                let accessToken = signOption(user)
                let refreshToken = saveRefreshToken(user)
                return res.status(200).send({
                    accessToken,
                    refreshToken
                })
            }
            res.status(401).send(responseWithCustomError('Unauthorized.', 401))
        })
    } catch (error) {
        res.status(401).send(responseWithCustomError('Unauthorized.', 401))
    }
}

export const refreshToken = async (req, res) => {
    try {
        let { refreshToken, userId } = req.body
        let userOject = await getUserFromRefreshToken(userId, refreshToken)
        let user = JSON.parse(userOject)
        let accessToken = signOption(user)
        res.status(200).send({
            accessToken
        })
    } catch (error) {
        res.status(401).send(responseWithCustomError('Unauthorized.', 401))
    }
}

export const logout = async (req, res) => {
    try {
        let { userId, refreshToken } = req.body
        let userOject = await getUserFromRefreshToken(userId, refreshToken)
        let user = JSON.parse(userOject)
        if (user.id) {
            destroyToken(user.id, refreshToken)
            return res.status(204).send()
        }
        res.status(401).send(responseWithCustomError('Unauthorized.', 401))

    } catch (error) {
        res.status(401).send(responseWithCustomError('Unauthorized.', 401))
    }
}
