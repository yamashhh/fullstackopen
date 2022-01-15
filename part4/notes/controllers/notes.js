import Note from '../models/note.js'
import express from 'express'

const notesRouter = express.Router()

notesRouter.get('/', async (_, response) => {
  const notes = await Note.find()
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    note ? response.json(note) : response.status(404).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/', async (request, response, next) => {
  const { content, important = false } = request.body

  const note = new Note({
    content,
    important,
    date: new Date(),
  })

  try {
    const savedNote = await note.save()
    response.json(savedNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', async (request, response, next) => {
  const { content, important } = request.body

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      request.params.id,
      { content, important },
      { new: true }
    )
    response.json(updatedNote)
  } catch (error) {
    next(error)
  }
})

export default notesRouter
