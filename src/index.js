import app from './app'
const port = process.env.PORT

app.set('port', port)

app.listen(app.get('port'),() => {
    console.log(`Server run at ${port}`)
});