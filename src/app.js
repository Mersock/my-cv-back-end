import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import './db/mongodb'
// import './db/redis'
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

app.all('*', function (req, res, next) {
    let responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE",
        "AccessControlAllowCredentials": true
    };

    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin", responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});


app.use(handleRequest)

app.get('/', (req, res) => {
    res.send('This is My-CV APIs.')
})

app.use(router)

app.use(handleRolePermissions)


app.use('*', handleRouter);

export default app
