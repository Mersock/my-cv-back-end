import mongoose from 'mongoose';

class Mongodb {
    constructor() {
        const url = process.env.MONGO_URL
        const option = {
            user: process.env.MONGO_DB_USER,
            pass: process.env.MONGO_DB_PASSWORD,
            useNewUrlParser: true
        }
        mongoose.connect(url, option)
    }
}

export default new Mongodb();