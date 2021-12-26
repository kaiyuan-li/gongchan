const expect = require('chai').expect
const mongoose = require('mongoose')
const {initDb, cleanupDb} = require('./helper.js')

describe('Database connection test', () => {
    beforeEach(async () => {
        await initDb()
    })

    afterEach(async () => {
        await cleanupDb()
    })

    it('Can make connection to the DB', () => {
        expect(mongoose.connection.readyState).to.equal(1)
    })
})