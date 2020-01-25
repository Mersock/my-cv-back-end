import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { responseWithCustomError } from '../utils/response'

const publicKey = fs.readFileSync(path.join(__dirname, '../keys') + '/public.key', 'utf8');

export const authLogin = (req, res, next) => {
    try {
        const headerToken = req.header('Authorization')
        const token = headerToken.split(' ')
        const accessToken = token[1]
        const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 4)
        const signOptions = {
            expiresIn: exp,
            algorithm: "RS256"
        };
        const user = jwt.verify(accessToken, publicKey, signOptions)
        if (user.id && user.username) {
            const { id, username, permissions } = user
            req.user = { id, username, permissions }
            return next()
        }
        res.status(401).send(responseWithCustomError('Unauthorization.', 401))
    } catch (error) {
        console.log(error)
        res.status(401).send(responseWithCustomError('Unauthorization.', 401))
    }
}