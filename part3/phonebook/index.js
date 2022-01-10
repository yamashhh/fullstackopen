import express, { json } from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import Person from './models/person.js' // eslint-disable-line import/extensions

dotenv.config()
const PORT = process.env.PORT || 3001

const app = express()
app.use(express.static('build'))
app.use(json())

morgan.token('request-body', (request) => JSON.stringify(request.body))
app.use(morgan('tiny', { skip: (request) => request.method === 'POST' }))
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :request-body',
    {
      skip: (request) => request.method !== 'POST',
    }
  )
)

app.post('/api/persons', async (request, response, next) => {
  const { name, number } = request.body
  const person = new Person({ name, number })

  try {
    const savedPerson = await person.save()
    response.json(savedPerson)
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons', async (_, response) => {
  const persons = await Person.find()
  response.json(persons)
})

app.get('/api/persons/:id', async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id)
    if (person) {
      response.json(person)
      return
    }
    response.status(404).end()
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (request, response, next) => {
  const { number } = request.body

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      request.params.id,
      { number },
      { new: true, runValidators: true, context: 'query' }
    )
    response.json(updatedPerson)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    await Person.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.get('/info', async (_, response) => {
  const peopleCount = await Person.estimatedDocumentCount()
  return response.send(`
<p>Phonebook has info for ${peopleCount} people</p>
<p>${new Date().toString()}</p>
`)
})

const unknownEndpoint = (_, response) =>
  response.status(404).send({ error: 'unknown endpoint' })
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' })
    return
  }
  if (error.name === 'ValidationError') {
    response.status(422).json({ error: error.message })
    return
  }

  next(error)
}
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
