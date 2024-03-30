const config = require('./utils/config')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const userRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('connected to MongoDB'))
    .catch((error) => logger.error('error connection to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))
app.use('/api/users', userRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app