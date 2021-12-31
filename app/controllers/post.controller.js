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

module.exports = {
    submitPost,
}