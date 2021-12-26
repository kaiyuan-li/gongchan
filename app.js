const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')


// Database trial
const {startDatabase} = require('./database/mongo')
const {insertAd} = require('./database/ads')
const indexRouter = require('./routes/index')
const v0Router = require('./routes/api/v0')
const bodyParser = require('body-parser')
const book = require('./routes/book')

const app = express()

app.use(logger('dev'))
// helmet for improved API security
app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// If requesting just root, this middleware will be executed and just end the story.
app.use(express.static(path.join(__dirname, 'gcfe/dist')))


app.use('/api/v0', v0Router)
app.use('/book', book)
app.use('/', indexRouter)
startDatabase().then(async function () {
    console.log('database started')
    await insertAd({title: "hello, the first ad from the in-memory database"})
})

module.exports = app
