import Note from '../models/note.js'
import User from '../models/user.js'
import express from 'express'

const notesRouter = express.Router()

notesRouter.get('/', async (_, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  const note = await Note.findById(request.params.id)
  note ? response.json(note) : response.status(404).end()
})

notesRouter.post('/', async (request, response, next) => {
  const { content, important = false, userId } = request.body
  const user = await User.findById(userId)

  const note = new Note({
    content,
    important,
    date: new Date(),
    user: user._id,
  })

  const savedNote = await note.save()

  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response, next) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', async (request, response, next) => {
  const { content, important } = request.body

  const updatedNote = await Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true }
  )
  response.json(updatedNote)
})

export default notesRouter
