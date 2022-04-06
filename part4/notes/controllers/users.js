import bcrypt from 'bcrypt'
import express from 'express'
import User from '../models/user.js'

const usersRouter = express.Router()

usersRouter.get('/', async (_, response) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    date: 1,
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: 'username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

export default usersRouter
