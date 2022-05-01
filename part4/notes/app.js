import express, { json } from 'express'
import 'express-async-errors'
import notesRouter from './controllers/notes.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import testingRouter from './controllers/testing.js'
import logger from './utils/logger.js'
import { MONGODB_URI, NODE_ENV } from './utils/config.js'
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from './utils/middleware.js'
import mongoose from 'mongoose'

logger.info('connecting to', MONGODB_URI)

try {
  await mongoose.connect(MONGODB_URI)
  logger.info('connected to MongoDB')
} catch (error) {
  logger.error('error connecting to MongoDB: ', error.message)
}

const app = express()
app.use(express.static('build'))
app.use(json())
app.use(requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
