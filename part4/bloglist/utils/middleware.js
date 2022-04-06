import logger from './logger.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const requestLogger = (request, _, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

export const tokenExtractor = (request, _, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

export const userExtractor = async (request, _, next) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  if (user) {
    request.user = user
  }

  next()
}

export const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (error, _, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Invaild ID.' })
  }
  if (error.name === 'ValidationError') {
    return response.status(422).json({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid credentials.' })
  }
  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'Login expired.' })
  }

  next(error)
}
