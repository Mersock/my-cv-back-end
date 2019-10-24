const express = require('express')
const app = express()
const port = process.env.PORT || 3400
app.set('port', port)

app.get('/', (req, res) => {
    res.send('Hello World.')
})

app.listen(app.get('port'),() => {
    console.log(`Server run at ${port}`)
});