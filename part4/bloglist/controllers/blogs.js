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

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)
  result ? response.status(204).end() : response.status(404).end()
})

blogsRouter.patch('/:id', async (request, response) => {
  const { likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: likes ?? 0 },
    { new: true }
  )

  updatedBlog ? response.json(updatedBlog) : response.status(404).end()
})

export default blogsRouter
