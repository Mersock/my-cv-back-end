const express = require('express');
const bodyParser = require('body-parser')
require('./db/mongodb');
require('dotenv').config()

const app = express()

const postsRouter = require('./routes/v1/posts')

app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('This is My-CV APIs.')
})

app.use(postsRouter)

app.get('*', (req, res) => {
    res.status(404).send({
        'status_code': 404, 
        'message': 'Not Found.'
    })
})


module.exports = app
