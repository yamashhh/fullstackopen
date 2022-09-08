import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogsService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      blogsService.setToken(action.payload?.token ?? null)
      return action.payload
    },
    logout(state) {
      window.localStorage.removeItem('part-7-bloglist-user')
      blogsService.setToken(null)
      return null
    },
  },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer

export const login = createAsyncThunk(
  'user/login',
  async (credentials, { dispatch }) => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('part-7-bloglist-user', JSON.stringify(user))
    dispatch(userSlice.actions.setUser(user))
  }
)
