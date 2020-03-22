import bcrypt from 'bcryptjs'
import _ from 'lodash'
import { responseWithCustomError } from '../../utils/response'
import { signOption, saveRefreshToken, getUserFromRefreshToken, destroyRefreshToken } from '../../utils/authentications'
import User from '../../models/users'

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        return await User.findOne({ username }).populate({
            path: 'roles',
            populate: {
                path: 'permissions',
                select: ['name']
            }
        }).exec(function (err, user) {
            if (user) {
                const isMatch = bcrypt.compareSync(password, user.password)
                if (isMatch) {
                    const accessToken = signOption(user)
                    const refreshToken = saveRefreshToken(user)
                    return res.status(200).send({
                        tokenType: 'Bearer',
                        accessToken,
                        refreshToken
                    })
                }
            }
            res.status(401).send(responseWithCustomError('Unauthorized.', 401))
        })
    } catch (error) {
        res.status(401).send(responseWithCustomError('Unauthorized.', 401))
    }
}

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken, userId } = req.body
        const userOject = await getUserFromRefreshToken(userId, refreshToken)
        const user = JSON.parse(userOject)
        const accessToken = signOption(user)
        res.status(200).send({
            accessToken
        })
    } catch (error) {
        res.status(401).send(responseWithCustomError('Unauthorized.', 401))
    }
}

export const logout = async (req, res) => {
    try {
        const { userId, refreshToken } = req.body
        const userOject = await getUserFromRefreshToken(userId, refreshToken)
        const user = JSON.parse(userOject)
        if (user.id) {
            destroyRefreshToken(user.id, refreshToken)
            return res.status(204).send()
        }
        res.status(401).send(responseWithCustomError('Unauthorized.', 401))

    } catch (error) {
        res.status(401).send(responseWithCustomError('Unauthorized.', 401))
    }
}
