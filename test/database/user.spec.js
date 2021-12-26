const { expect } = require("chai")
const User = require("../../model/user")
const {initDb, cleanupDb} = require('./helper.js')

describe('Test the user schema', () => {
    beforeEach(async () => {
        await initDb()
    })

    afterEach(async () => {
        await cleanupDb()
    })

    it('should be able to save user to database', async () => {
        const me = new User({ name: 'Kai Li', email: 'lky@fb.com' })
        await me.save()
        const users = await User.find()
        expect(users).to.have.lengthOf(1)
    })
})