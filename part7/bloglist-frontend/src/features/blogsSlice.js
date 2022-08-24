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
