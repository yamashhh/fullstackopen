import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  extraReducers(builder) {
    builder.addCase(initializeUsers.fulfilled, (_, action) => {
      return action.payload
    })
  },
})

export default usersSlice.reducer

export const initializeUsers = createAsyncThunk(
  'users/initializeUsers',
  async () => {
    const users = await usersService.getAll()
    return users
  }
)
