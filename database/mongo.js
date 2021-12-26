const {MongoMemoryServer} = require('mongodb-memory-server')
const {MongoClient} = require('mongodb')
const mongoose = require('mongoose')


let database = null

const startDatabase = async () => {
    const mongoMemoryServer = await MongoMemoryServer.create()
    const mongodbUrl = await mongoMemoryServer.getUri()
    const connection = await MongoClient.connect(mongodbUrl, {useNewUrlParser: true})
    database = connection.db()
    await mongoose.connect(mongodbUrl)
    return {
        mongoMemoryServer,
        connection
    }
}

const getDatabase = async () => {
    if (!database) await startDatabase()
    return database
}

module.exports = {
    getDatabase,
    startDatabase
}