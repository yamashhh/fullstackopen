import logger from './utils/logger.js'
import { MONGODB_URI } from './utils/config.js'
import mongoose from 'mongoose'
import express, { json } from 'express'
import cors from 'cors'
import blogsRouter from './controllers/blogs.js'

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
app.use('/api/blogs', blogsRouter)

export default app
