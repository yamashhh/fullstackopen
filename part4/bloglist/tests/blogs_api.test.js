import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Blog from '../models/blog'
import { biggerList, blogsInDb } from './test_helper'

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(biggerList)
})

const api = supertest(app)

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(biggerList.length)
  })

  test('unique identifier property is named "id"', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach((blog) => {
      expect(blog).toHaveProperty('id')
    })
  })
})

describe('POST /api/blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'dummy',
      url: 'dummy',
      likes: 42,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(biggerList.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1]).toMatchObject(newBlog)
  })

  test('likes will default to 0', async () => {
    const blogWithoutLikes = {
      title: 'Blog without likes',
      author: 'dummy',
      url: 'dummy',
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1]?.likes).toBe(0)
  })

  test('blog without title and url is not added', async () => {
    const blogWithoutTitleAndUrl = {
      author: 'dummy',
    }

    await api.post('/api/blogs').send(blogWithoutTitleAndUrl).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
