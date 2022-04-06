import { Router } from 'express'
import Blog from '../models/blog.js'
import { tokenExtractor, userExtractor } from '../utils/middleware.js'

const blogsRouter = Router()

blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('user', {
    passwordHash: 0,
    blogs: 0,
  })
  response.json(blogs)
})

blogsRouter.post(
  '/',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const { title, author, url, likes } = request.body
    if (!title || !url) {
      return response.status(400).end()
    }

    const user = request.user
    if (!user) {
      return response.status(401).json({ error: 'Failed to identify user.' })
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes ?? 0,
      user: user._id,
    })
    const result = await blog.save()

    user.blogs = [...user.blogs, result._id]
    await user.save()

    response.status(201).json(result)
  }
)

blogsRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user', {
      passwordHash: 0,
      blogs: 0,
    })

    if (!blog) {
      return response.status(404).end()
    }

    const user = request.user
    if (!user || user._id.toString() !== blog.user._id.toString()) {
      return response.status(401).json({ error: 'Credentials mismatch.' })
    }

    await Blog.deleteOne(blog)
    response.status(204).end()
  }
)

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
