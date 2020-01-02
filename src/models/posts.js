import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const postsSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 1000
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    body: {
        type: String,
        required: true,
        maxlength: 10000
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postsSchema, 'posts')

export default Post