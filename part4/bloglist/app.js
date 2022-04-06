import logger from './utils/logger.js'
import { MONGODB_URI } from './utils/config.js'
import mongoose from 'mongoose'
import express, { json } from 'express'
import cors from 'cors'
import 'express-async-errors'
import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from './utils/middleware.js'

logger.info(`connecting to ${MONGODB_URI}`)

try {
  await mongoose.connect(MONGODB_URI)
  logger.info('connected to MongoDB')
} catch (error) {
  logger.error('Error connecting to MongoDB: ', error)
}

const app = express()
app.use(cors())
app.use(json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
