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
    }
},{
    timestamps:true
});

const Post = mongoose.model('Post',postsSchema,'posts') 

module.exports = Post