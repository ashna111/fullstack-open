const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')

const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')


const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

//DB Setup
logger.info('Connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })


//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app