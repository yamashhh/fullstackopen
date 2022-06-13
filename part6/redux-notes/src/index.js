import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import notesReducer from './features/notes/notesSlice'
import filterReducer from './features/filter/filterSlice'

const store = configureStore({
  reducer: {
    notes: notesReducer,
    filter: filterReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)