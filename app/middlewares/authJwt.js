const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models')
const User = db.User
const Role = db.Role

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(403).send({ message: "No token provided!" })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status.send({ message: "unauthorized!" })
        }
        req.userId = decoded.id
        next()
    })
}

const verifyRole = (roleName) => {
    return (req, res, next) => {
        User.findById(req.userId).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }
            if (user.roles && user.roles.includes(roleName)) {
                next()
                return
            }
            res.status(403).send({ message: `user doesn't have ${roleName} role` })
            return
        })
    }
}

const isAdmin = verifyRole('admin')
const isModerator = verifyRole('moderator')

module.exports = {
    verifyToken,
    isAdmin,
    isModerator,
}