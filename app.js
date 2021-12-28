const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')


// Database trial
const indexRouter = require('./app/routes/index')
const v0Router = require('./app/routes/api/v0')
const bodyParser = require('body-parser')
const book = require('./app/routes/book')

const app = express()

app.use(logger('dev'))
// helmet for improved API security
app.use(helmet())
app.use(bodyParser.json())
app.use(cors({origin: "http://localhost:8081"}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// If requesting just root, this middleware will be executed and just end the story.
app.use(express.static(path.join(__dirname, 'gcfe/dist')))


app.use('/api/v0', v0Router)
app.use('/book', book)
app.use('/', indexRouter)

module.exports = app
