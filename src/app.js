import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import './db/mongodb'
import './db/redis'
import router from './routes/index';
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

app.use(router)

app.use('*', handleRouter);

export default app
