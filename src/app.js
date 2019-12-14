const express = require('express');
const bodyParser = require('body-parser')
const postsRouter = require('./routes/v1/posts')
const usersRouter = require('./routes/v1/users')
const authRouter = require('./routes/v1/authentications')

require('./db/mongodb');
require('dotenv').config({
    path: '/.env.dev'
})

require('./db/redis');

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.use((err, req, res, next) => {
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
})

app.get('/', (req, res) => {
    res.send('This is My-CV APIs.')
})

app.use(authRouter)
app.use(postsRouter)
app.use(usersRouter)

app.get('*', function (req, res, next) {
    res.status(404).send({
        statusCode: 404,
        message: 'Page Not Found.'
    })
});
module.exports = app
