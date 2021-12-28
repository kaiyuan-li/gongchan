const db = require('../models')
const ROLES = db.ROLES
const User = require('../models/user.model')

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }

        if (user) {
            res.status(400).send({ message: 'username already registered'})
            return
        }

        if (!req.body.email) {
            res.status(400).send({ message: 'email cannot be empty' })
            return
        }

        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err})
                return
            }

            if (user) {
                res.status(400).send({ message: "email already in use"})
                return
            }
            next()
        })
    })
}

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let role of req.body.roles) {
            if (!ROLES.includes(role)) {
                res.status(400).send(
                    { message: `FAILED! Role ${role} does not exist`}
                )
            }
            return
        }
    }
    next()
}

const checkPassword = (req, res, next) => {
    if (!req.body.password) {
        res.status(400).send({ message: "password cannot be empty"})
        return
    }
    next()
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
    checkPassword
}

module.exports = verifySignUp