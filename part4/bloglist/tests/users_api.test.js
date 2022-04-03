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
      username: '123`',
      name: 'New User',
      password: '123',
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

  test('a user without a name can be added', async () => {
    const userWithoutName = {
      username: 'user_without_name',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(userWithoutName)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length + 1)
    expect(usersAtEnd[usersAtEnd.length - 1]).toMatchObject({
      username: userWithoutName.username,
      name: expect.stringMatching(''),
    })
  })

  test('fails when username is missing', async () => {
    const userWithoutUsername = {
      name: 'User without username',
      password: 'password',
    }

    const response = await api
      .post('/api/users')
      .send(userWithoutUsername)
      .expect(422)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
    expect(response.body.error).toEqual(expect.any(String))
  })

  test('fails when password is missing', async () => {
    const userWithoutPassword = {
      username: 'user_without_password',
      name: 'User without password',
    }

    const response = await api
      .post('/api/users')
      .send(userWithoutPassword)
      .expect(422)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
    expect(response.body.error).toEqual(expect.any(String))
  })

  test('fails when username and password is missing', async () => {
    const userWithoutUsernameAndPassword = {
      name: 'User without username and password',
    }

    const response = await api
      .post('/api/users')
      .send(userWithoutUsernameAndPassword)
      .expect(422)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
    expect(response.body.error).toEqual(expect.any(String))
  })

  test('fails when username is under 3 characters', async () => {
    const userWithShortUsername = {
      username: '12',
      name: 'User with short username',
      password: 'password',
    }

    const response = await api
      .post('/api/users')
      .send(userWithShortUsername)
      .expect(422)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
    expect(response.body.error).toEqual(expect.any(String))
  })

  test('fails when password is under 3 characters', async () => {
    const userWithShortPassword = {
      username: 'user_with_short_password',
      name: 'User with short password',
      password: '12',
    }

    const response = await api
      .post('/api/users')
      .send(userWithShortPassword)
      .expect(422)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
    expect(response.body.error).toEqual(expect.any(String))
  })

  test('fails when username and password are under 3 characters', async () => {
    const userWithShortUsernameAndPassword = {
      username: '12',
      name: 'User with short username and password',
      password: '12',
    }

    const response = await api
      .post('/api/users')
      .send(userWithShortUsernameAndPassword)
      .expect(422)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
    expect(response.body.error).toEqual(expect.any(String))
  })
})

afterAll(() => {
  mongoose.connection.close()
})
