const mongoose = require("mongoose");

const Post = mongoose.model(
    'Post',
    new mongoose.Schema({
        author: String,
        title: String,
        content: String,
        createdAt: Date,
    })
)

module.exports = Post