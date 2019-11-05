const mongoose = require('mongoose');
const connectionURL = 'mongodb://mongo-db:27017/my-cv?authSource=admin';

const option = {
    user: process.env.MONGO_DB_USER,
    pass: process.env.MONGO_DB_PASSWORD,
    useNewUrlParser: true
}

mongoose.connect(connectionURL, option);