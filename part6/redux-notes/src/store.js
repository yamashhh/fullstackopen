import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './features/notes/notesSlice'
import filterReducer from './features/filter/filterSlice'

const store = configureStore({
  reducer: {
    notes: notesReducer,
    filter: filterReducer,
  },
})

export default store
