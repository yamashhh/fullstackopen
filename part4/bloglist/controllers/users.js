import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt'

const usersRouter = express.Router()

usersRouter.get('/', async (_, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
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
    name,
    passwordHash,
  }).save()
  response.status(201).json(user)
})

export default usersRouter
