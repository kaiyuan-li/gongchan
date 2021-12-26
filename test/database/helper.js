const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoMemoryServer

const initDb = async () => {
    mongoMemoryServer = await MongoMemoryServer.create()
    const mongodbUrl = await mongoMemoryServer.getUri()
    await mongoose.connect(mongodbUrl)
}

const cleanupDb = async () => {
    await mongoose.connection.close()
    await mongoMemoryServer.stop()
}

module.exports = {
    initDb,
    cleanupDb,
}