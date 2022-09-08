import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  extraReducers(builder) {
    builder
      .addCase(initializeBlogs.fulfilled, (_, action) => {
        return action.payload
      })
      .addCase(createNewBlog.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        return state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        )
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        return state.filter((blog) => blog.id !== action.payload.id)
      })
      .addCase(commentBlog.fulfilled, (state, action) => {
        return state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        )
      })
  },
})

export default blogsSlice.reducer

export const blogsSelector = createSelector(
  (state) => state.blogs,
  (blogs) => [...blogs].sort((a, b) => b.likes - a.likes)
)

export const initializeBlogs = createAsyncThunk(
  'blogs/initializeBlogs',
  async () => {
    const blogs = await blogsService.getAll()
    return blogs
  }
)

export const createNewBlog = createAsyncThunk(
  'blogs/createNewBlog',
  async (blog) => {
    const newBlog = await blogsService.create(blog)
    return newBlog
  }
)

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async (payload) => {
    const updatedBlog = await blogsService.update(payload)
    return updatedBlog
  }
)

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (blog) => {
  await blogsService.deleteBlog(blog.id)
  return blog
})

export const commentBlog = createAsyncThunk(
  'blogs/commentBlog',
  async (payload) => {
    const commentedBlog = await blogsService.comment(payload)
    return commentedBlog
  }
)
