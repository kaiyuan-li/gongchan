// const config = require('../config/auth.config')
const db = require('../models')
const { User } = db
const config = require('../config/auth.config')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        roles: req.body.roles || ['user'],
    })

    console.log('saving user to database')

    user.save(err => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }

        res.send({ message: "User registered successfully" })
    })
}

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    }).populate('roles', '-__v')
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }
            if (!user) {
                return res.status(404).send({ message: 'user not found' })
            }
            const isPasswordValid = bcrypt.compareSync(
                req.body.password,
                user.password
            )
            if (!isPasswordValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Invalid Password!'
                })
            }
            console.log('generating jwt token')
            const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 })
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: user.roles,
                accessToken: token
            })
        })
}
