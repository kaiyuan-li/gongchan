const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose

db.User = require('./user.model')
db.Post = require('./post.model')

db.ROLES = ['user', 'admin', 'mod']

module.exports = db