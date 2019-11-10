const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    body:{
        type:String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post',postsSchema,'posts') 

module.exports = Post