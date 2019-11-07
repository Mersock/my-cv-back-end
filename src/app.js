const express = require('express');
const bodyParser = require('body-parser')
const postsRouter = require('./routes/v1/posts')

require('./db/mongodb');
require('dotenv').config({
    path: '/.env.dev'
})

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.use((err, req, res, next) => {
    if (err.statusCode == 400) {
        res.status(err.statusCode).send({
            status_code: err.statusCode,
            message: 'Bad Request.'
        })
    }
    if (err.statusCode == 500) {
        res.status(err.statusCode).send({
            status_code: err.statusCode,
            message: 'Internal Server Error.'
        })
    }
    next();
})

app.get('/', (req, res) => {
    res.send('This is My-CV APIs.')
})

app.use(postsRouter)

app.get('*', function (req, res, next) {
    res.status(404).send({
        status_code: 404,
        message: 'Page Not Found.'
    })
});
module.exports = app
