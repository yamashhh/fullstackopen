import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt'

const usersRouter = express.Router()

usersRouter.get('/', async (_, response) => {
  const users = await User.find({}).populate('blogs', { likes: 0, user: 0 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(409).json({ error: 'Username already taken.' })
  }

  if (!password) {
    return response.status(422).json({ error: 'Password is required.' })
  }
  if (password?.length < 3) {
    return response
      .status(422)
      .json({ error: 'Password must be at least 3 characters long.' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await new User({
    username,
    name: name ?? '',
    passwordHash,
  }).save()
  response.status(201).json(user)
})

export default usersRouter
