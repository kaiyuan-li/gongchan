const { Post } = require('../models')

const submitPost = async (req, res) => {
    console.log(`submitting post: ${req.body}`)
    const post = new Post({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        createdAt: req.body.createdAt
    })
    await post.save()
    res.status(200).send({message: "Post submitted"})
}

const getAllPosts = (req, res) => {
    console.log('getting all posts')
    Post.find({}, 'title _id createdAt author').then((posts, err)=> {
        if (err) {
            res.status(500).send({message: err})
            return
        }
        res.status(200).json(posts)
    })
}

const getPost = (req, res) => {
    console.log(`request is ${req._id}`)
    Post.findOne({_id: req.query._id}).exec((err, post) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        res.status(200).json(post)
    })
}
module.exports = {
    submitPost,
    getAllPosts,
    getPost,
}