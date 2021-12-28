const {MongoMemoryServer} = require('mongodb-memory-server')
const { Role } = require('../models')
const db = require('../models')

const startInMemoryDatabase = async () => {
    const mongoMemoryServer = await MongoMemoryServer.create()
    return mongoMemoryServer
}

const insertRole = async (role) => {
    await new Role({name: role}).save(err => {
        if (err) {
            console.log("error when inserting role: ", err)
        } else {
            console.log(`added role ${role} to roles collection`)
        }
    })
}

const seedRoles = async () => {
    const count = await Role.estimatedDocumentCount()
    if (count > 0) return
    console.log('lky-debug: seeding roles')
    
    db.ROLES.forEach(async role => {
        await insertRole(role)
    })
}

module.exports = {
    startInMemoryDatabase,
    seedRoles,
}