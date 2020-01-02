import mongoose from 'mongoose';

const mongoConnect = () => {
    let url = process.env.MONGO_URL
    let option = {
        user: process.env.MONGO_DB_USER,
        pass: process.env.MONGO_DB_PASSWORD,
        useNewUrlParser: true
    }
    mongoose.connect(url, option)
}

export default mongoConnect();