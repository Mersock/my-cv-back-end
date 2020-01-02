export const handleRequest = (err, req, res, next) => {
    if (err.statusCode == 400) {
        return res.status(err.statusCode).send({
            statusCode: err.statusCode,
            message: 'Bad Request.'
        })
    }
    if (err.statusCode == 500) {
        return res.status(err.statusCode).send({
            statusCode: err.statusCode,
            message: 'Internal Server Error.'
        })
    }
    next();
}

export const handleRouter = (req, res, next) => {
    res.status(404).send({
        statusCode: 404,
        message: 'Not Found.'
    })
}

export const handleRolePermissions = (err, req, res, next) => {
    if (err.code === 'permission_denied') {
        res.status(403).send({
            statusCode: 403,
            message: 'Forbidden.'
        });
    }
}