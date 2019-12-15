const express = require('express');
const bodyParser = require('body-parser')
const postsRouter = require('./routes/v1/posts')
const usersRouter = require('./routes/v1/users')
const authRouter = require('./routes/authentications')

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
    console.log(err)
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

app.use('*', function (req, res, next) {
    res.status(404).send({
        statusCode: 404,
        message: 'Not Found.'
    })
});
module.exports = app
