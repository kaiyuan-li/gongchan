const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app')
const {
    initializeInMemoryDb,
    cleanupDb
} = require('../db-helper')
const { User }= require('../../app/models')
const { checkDuplicateUsernameOrEmail } = require('../../app/middlewares/verifySignUp')

chai.use(chaiHttp)
chai.should()

before(async () => {
    await initializeInMemoryDb()
})

after(async () => await cleanupDb())

describe('Test auth API v0', () => {
    describe('Test POST /auth/signup', () => {
        it('should signup user and return token', async () => {
            const USERNAME = 'foo'
            const res = await chai.request(app).post('/api/v0/auth/signup').send({username: USERNAME, password: '123'})
            res.should.have.status(200)
            const users = await User.find()
            chai.expect(users).to.have.lengthOf(1)
            chai.expect(users[0].username).to.equal(USERNAME)
        })
    })
})