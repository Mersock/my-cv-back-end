const mongoose = require('mongoose');
const connectionURL = process.env.MONGO_URL

const option = {
    user: process.env.MONGO_DB_USER,
    pass: process.env.MONGO_DB_PASSWORD,
    useNewUrlParser: true
}

mongoose.connect(connectionURL, option);