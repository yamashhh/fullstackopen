import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import User from '../models/user.js'

const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {
  const user = await User.findOne({ username: request.body?.username })
  const isValidCredentials =
    user && (await bcrypt.compare(request.body?.password, user?.passwordHash))

  if (!isValidCredentials) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  )

  response.status(200).json({ token, username: user.username, name: user.name })
})

export default loginRouter
