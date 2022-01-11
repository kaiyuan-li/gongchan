const {expect} = require('chai')
const mongoose = require('mongoose')
const {
    initializeInMemoryDb,
    cleanupDb
} = require('../../db-helper')

before(async () => {
    await initializeInMemoryDb()
})

after(async () => await cleanupDb())


describe('In memory MongoDb server connection', () => {
    it('should connect to mongodb server', async () => {
        expect(mongoose.connection.readyState).to.equal(1)
    })
})
