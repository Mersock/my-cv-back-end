const Post = require('../models/posts');


exports.getAll  = async (req, res) => {
    const posts = await {
        "id" : "safsadf",
        "xxxx":"sadfasdf"
    }
    res.json(posts)
};

exports.insert = async (req,res) => {
    const post = new Post(req.body)
    try {
        await post.save();
        res.status(201).json(post)
    } catch (error) {
        console.log(error)
        const {errors} = error
        res.status(400).send({
            status_code:400,
            errors
        })
    }
}
