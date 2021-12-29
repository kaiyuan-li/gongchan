const allAccess = (req, res) => {
    res.status(200).send("public content")
}

const userBoard = (req, res) => {
    res.status(200).send("user content")
}

const adminBoard = (req, res) => {
    res.status(200).send("admin content")
}

const moderatorBoard = (req, res) => {
    res.status(200).send("moderator content")
}

const db = require('../models')
const User = db.User
const allUsers = (req, res) => {
    User.find((err, users) => {
        res.status(200).json(users)
    })
}

module.exports = {
    allAccess,
    userBoard,
    adminBoard,
    moderatorBoard,
    allUsers,
}