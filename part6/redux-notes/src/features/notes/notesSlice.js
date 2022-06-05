import { createSlice } from '@reduxjs/toolkit'

const notesSlice = createSlice({
  name: 'notes',
  initialState: [
    {
      content: 'reducer defines how redux store works',
      important: true,
      id: 1,
    },
    {
      content: 'state of store can contain any data',
      important: false,
      id: 2,
    },
  ],
  reducers: {
    add(state, action) {
      state.push({
        content: action.payload,
        important: false,
        id: Number((Math.random() * 1000000).toFixed(0)),
      })
    },
    toggleImportance(state, action) {
      const note = state.find((note) => note.id === action.payload)
      note.important = !note.important
    },
  },
})

export const { add, toggleImportance } = notesSlice.actions
export default notesSlice.reducer
