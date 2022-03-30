import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Blog from '../models/blog'
import { biggerList, blogsInDb, nonExistingId } from './test_helper'

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

describe('DELETE /api/blogs/:id', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  })

  test('fails with status code 404 if blog is already deleted', async () => {
    const validNonExistingId = await nonExistingId()
    await api.delete(`/api/blogs/${validNonExistingId}`).expect(404)
  })
})

describe('PATCH /api/blogs/:id', () => {
  test('amount of likes can be updated', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 42 })
      .expect(200)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(blogsAtEnd[0]).toEqual({ ...blogToUpdate, likes: 42 })
  })

  test('amount of likes is 0 when it is not defined on update', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api.patch(`/api/blogs/${blogToUpdate.id}`).send({}).expect(200)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(blogsAtEnd[0]).toEqual({ ...blogToUpdate, likes: 0 })
  })

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonExistingId = await nonExistingId()
    await api.patch(`/api/blogs/${validNonExistingId}`).send({}).expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
