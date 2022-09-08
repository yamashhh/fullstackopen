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
      return response.status(400).json({ error: 'Title and URL are required.' })
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
    await blog.save()
    const result = await blog.populate('user', {
      passwordHash: 0,
      blogs: 0,
    })

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
  ).populate('user', {
    passwordHash: 0,
    blogs: 0,
  })

  updatedBlog ? response.json(updatedBlog) : response.status(404).end()
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body

  const blog = await Blog.findById(request.params.id).populate('user', {
    passwordHash: 0,
    blogs: 0,
  })
  if (!blog) {
    return response.status(404).end()
  }

  blog.comments.push({ comment })
  await blog.save()
  const result = await blog.populate('user', {
    passwordHash: 0,
    blogs: 0,
  })

  response.status(201).json(result)
})

export default blogsRouter
