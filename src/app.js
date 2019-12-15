const express = require('express');
const bodyParser = require('body-parser')
const postsRouter = require('./routes/v1/posts')
const usersRouter = require('./routes/v1/users')
const authRouter = require('./routes/authentications')
const { handleRequrest, handleRouter } = require('./middlewares/handle')

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

app.use(handleRequrest)

app.get('/', (req, res) => {
    res.send('This is My-CV APIs.')
})

app.use(authRouter)
app.use(postsRouter)
app.use(usersRouter)

app.use('*', handleRouter);
module.exports = app
