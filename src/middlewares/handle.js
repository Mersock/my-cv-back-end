import { responseWithCustomError } from '../utils/response'

export const handleRequest = (err, req, res, next) => {
    if (err.statusCode == 400) {
        return res.status(err.statusCode).send(responseWithCustomError('Bad Request.', err.statusCode))
    }
    if (err.statusCode == 500) {
        return res.status(err.statusCode).send(responseWithCustomError('Internal Server Error.', err.statusCode))
    }
    next();
}

export const handleRouter = (req, res, next) => {
    res.status(404).send(responseWithCustomError('Not Found.', 404))
}

export const handleRolePermissions = (err, req, res, next) => {
    if (err.code === 'permission_denied') {
        res.status(403).send(responseWithCustomError('Forbidden.', 403));
    }
}