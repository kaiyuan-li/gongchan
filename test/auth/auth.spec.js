const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app')
const {
    initializeInMemoryDb,
    cleanupDb
} = require('../db-helper')
const { User }= require('../../app/models')
const res = require('express/lib/response')

chai.use(chaiHttp)
chai.should()

before(async () => {
    await initializeInMemoryDb()
})

after(async () => await cleanupDb())

describe('Test auth API v0', () => {
    const signinUrl = '/api/v0/auth/signin'
    const signupUrl = '/api/v0/auth/signup'
    describe('Test POST /auth/signup', () => {
        it('should signup new user', async () => {
            const USERNAME = 'foo'
            const res = await chai.request(app).post(signupUrl).send({username: USERNAME, email: 'email@where.com', password: '123'})
            res.should.have.status(200)
            const users = await User.find()
            chai.expect(users).to.have.lengthOf(1)
            chai.expect(users[0].username).to.equal(USERNAME)
        })

        it('should reject user with empty password', async () => {
            const res = await chai.request(app).post(signupUrl).send({username: 'random', email: 'random@email.com'})
            res.should.have.status(400)
            res.body.should.have.property('message').eql('password cannot be empty')
            
        })

        it('should reject user signup with duplicated ID', async () => {
            let res = await chai.request(app).post(signupUrl).send({username: 'mickey', email: 'foo@bar.com', password: 'mouse'})
            res.should.have.status(200)
            res = await chai.request(app).post(signupUrl).send({username: 'mickey', email: 'notfoo@bar.com', password: 'duck'})
            res.should.have.status(400)
            res.body.should.have.property('message').eql('username already registered')
        })

        it('should reject signup with no email', async () => {
            const res = await chai.request(app).post(signupUrl).send({username: 'pluto', password: 'imadog'})
            res.should.have.status(400)
            res.body.should.have.property('message').eql('email cannot be empty')
        })
    })

    describe('Test POST /auth/signin', () => {
        const username = 'pikachu'
        const password = 'pwdpikachu'
        const email = 'pikachu@pokemon.com'

        before(async () => {
            let res = await chai.request(app).post(signupUrl).send({username, email, password})
            res.should.have.status(200)
        })

        it('should signin registered user', async () => {
            let res = await chai.request(app).post(signinUrl).send({username, password})
            res.should.have.status(200)
            res.body.should.have.property('accessToken')
        })

        it('should reject user with wrong password', async () => {
            let res = await chai.request(app).post(signinUrl).send({username, password: 'strange'})
            res.should.have.status(401)
            res.body.should.have.property('message').eql('Invalid Password!')
        })
    })
})