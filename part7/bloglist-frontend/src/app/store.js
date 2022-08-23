import { configureStore } from '@reduxjs/toolkit'
import snackbarReducer from '../features/snackbarSlice'

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
})
