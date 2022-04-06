import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Note from '../models/note.js'
import { initialNotes, notesInDb, nonExistingId } from './test_helper.js'

beforeEach(async () => {
  await Note.deleteMany({})
  // for loop
  // for (const note of initialNotes) {
  //   await new Note(note).save()
  // }

  // Promise.all()
  // await Promise.all(initialNotes.map((note) => new Note(note).save()))

  // Mongoose insertMany()
  await Note.insertMany(initialNotes)
})

const api = supertest(app)

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map((response) => response.content)

    expect(contents).toContain('Browser can execute only Javascript')
  })
})

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const noteToView = (await notesInDb())[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultNote.body).toEqual(JSON.parse(JSON.stringify(noteToView)))
  })

  test('fails with status code 404 if note does not exist', async () => {
    const validNonexistingId = await nonExistingId()

    await api.get(`/api/notes/${validNonexistingId}`).expect(404)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/notes/${invalidId}`).expect(400)
  })
})

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    await api
      .post('/api/notes')
      .send({
        content: 'async/await simplifies making async calls',
        important: true,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await notesInDb()
    expect(notesAtEnd).toHaveLength(initialNotes.length + 1)

    const contents = notesAtEnd.map((note) => note.content)
    expect(contents).toContain('async/await simplifies making async calls')
  })

  test('fails with status code 422 if data is invalid', async () => {
    await api.post('/api/notes').send({ important: true }).expect(422)

    const notesAtEnd = await notesInDb()
    expect(notesAtEnd).toHaveLength(initialNotes.length)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await notesInDb()
    const noteToDelete = notesAtStart[0]

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

    const notesAtEnd = await notesInDb()
    expect(notesAtEnd).toHaveLength(notesAtStart.length - 1)

    const contents = notesAtEnd.map((note) => note.content)
    expect(contents).not.toContain(noteToDelete.content)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
