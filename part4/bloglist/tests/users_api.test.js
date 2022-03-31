import supertest from 'supertest'
import app from '../app'
import User from '../models/user'
import { initialUsers, usersInDb } from './test_helper'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

beforeEach(async () => {
  await User.deleteMany({})
  await Promise.all(
    initialUsers.map(async (user) =>
      new User({
        username: user.username,
        name: user.name,
        passwordHash: await bcrypt.hash(user.password, 10),
      }).save()
    )
  )
})

const api = supertest(app)

describe('POST /api/users', () => {
  test('a valid user can be added', async () => {
    const newUser = {
      username: 'new_user',
      name: 'New User',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length + 1)
    expect(usersAtEnd[usersAtEnd.length - 1]).toMatchObject({
      username: newUser.username,
      name: newUser.name,
    })
  })

  // TODO: test for invalid user
  // test('a user without a name can be added')
})

afterAll(() => {
  mongoose.connection.close()
})
