const express = require('express')
const bodyParser  = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.set('port', port)

app.get('/', (req, res) => {
    res.send('Hello World .')
})

app.listen(app.get('port'),() => {
    console.log(`Server run at ${port}`)
});