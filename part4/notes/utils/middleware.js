import logger from './logger.js'

export const requestLogger = (request, _, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

export const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (error, _, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(422).json({ error: error.message })
  }

  next(error)
}
