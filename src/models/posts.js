import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'


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
    },
    imagesUrl: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

postsSchema.options.toJSON = {
    transform: function (doc, posts, options) {
        posts.id = posts._id
        delete posts._id
        delete posts.__v
        return posts
    }
}

postsSchema.plugin(mongoosePaginate)

const Post = mongoose.model('Post', postsSchema, 'posts')

export default Post