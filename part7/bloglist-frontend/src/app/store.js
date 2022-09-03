import { configureStore } from '@reduxjs/toolkit'
import snackbarReducer from '../features/snackbarSlice'
import blogsReducer from '../features/blogsSlice'
import userReducer from '../features/userSlice'

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
})