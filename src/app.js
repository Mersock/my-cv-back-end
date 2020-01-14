import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import './db/mongodb'
import './db/redis'
import postsRouter from './routes/v1/posts'
import usersRouter from './routes/v1/users'
import authRouter from './routes/authentications'
import roleRouter from './routes/v1/roles';
import permissionsRouter from './routes/v1/permissions'
import clientRouter from './routes/v1/client'
import { handleRequest, handleRouter, handleRolePermissions } from './middlewares/handle'

const app = express()

dotenv.config({
    path: '/.env.dev'
})

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.use(handleRequest)

app.get('/', (req, res) => {
    res.send('This is My-CV APIs.')
})

app.use(authRouter)
app.use(postsRouter)
app.use(usersRouter)
app.use(roleRouter)
app.use(permissionsRouter)
app.use(clientRouter)

app.use(handleRolePermissions)

app.use('*', handleRouter);

export default app
