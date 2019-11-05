const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    author: {
        type:String,
        required: true
    },
    body:{
        type:String,
        required: true
    }
});

const Post = mongoose.model('Post',postsSchema,'posts') 

module.exports = Post