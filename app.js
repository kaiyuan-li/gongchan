const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const config = require('./config')


// Database trial
const authRouter = require('./app/routes/api/v0/auth.routes')
const userRouter = require('./app/routes/api/v0/user.routes')
const postRouter = require('./app/routes/api/v0/post.routes')
const bodyParser = require('body-parser')
const { mongoose } = require('./app/models')

const app = express()
app.disable('etag')

console.log(`Running in environment ${config.NODE_ENV}`)

app.use(logger('dev'))
// helmet for improved API security
app.use(helmet())
app.use(bodyParser.json())
app.use(cors({ origin: "http://localhost:8081" }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// If requesting just root, this middleware will be executed and just end the story.
app.use(express.static(path.join(__dirname, 'gcfe/dist')))

app.use('/api/v0', authRouter)
app.use('/api/v0', userRouter)
app.use('/api/v0', postRouter)

if (config.NODE_ENV === 'local') {
    const startDb = async () => {
        const { startInMemoryDatabase } = require('./app/database/mongo')
        const mongoose = require('mongoose')
        dbServer = await startInMemoryDatabase()
        const mongodbUrl = await dbServer.getUri()
        await mongoose.connect(mongodbUrl)
        console.assert(mongoose.connection.readyState == 1)
    }
    startDb()
}
if (config.NODE_ENV === 'dev' || config.NODE_ENV === 'prod') {
    const startDb = async () => {
        await mongoose.connect(config.URI)
        console.assert(mongoose.connection.readyState == 1)
        console.log('mongoose successfully connected to remote database')
    }
    startDb()
}

module.exports = app
