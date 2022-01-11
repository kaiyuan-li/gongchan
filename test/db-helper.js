const {startInMemoryDatabase} = require('../app/database/mongo')
const mongoose = require('mongoose')
const db = require('../app/models')

let dbServer = null
// NOTE: there can be race inside this helper. Two tests accessing this file,
// one opened a DB then close it. The other was using the opened one but the DB closed
// before it finished all the exercises.

const initializeInMemoryDb = async () => {
    if (mongoose.connection.readyState === 1) return
    dbServer = await startInMemoryDatabase()
    const mongodbUrl = await dbServer.getUri()
    await mongoose.connect(mongodbUrl)
}

// Disconnect and stop db server
const cleanupDb = async() => {
    if (dbServer == null) return
    await mongoose.connection.close()
    await dbServer.stop()
    dbServer = null
}

// Clear all collections of the db
const resetDb = async() => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
        await collections[key].deleteMany()
    }
}

module.exports = {
    initializeInMemoryDb,
    cleanupDb,
    resetDb,
}