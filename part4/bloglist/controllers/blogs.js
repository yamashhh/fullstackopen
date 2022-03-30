import { Router } from 'express'
import Blog from '../models/blog.js'

const blogsRouter = Router()

blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  if (!title || !url) {
    return response.status(400).end()
  }

  const blog = new Blog({ title, author, url, likes: likes ?? 0 })
  const result = await blog.save()
  response.status(201).json(result)
})

export default blogsRouter
