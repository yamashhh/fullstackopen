import { createSlice } from '@reduxjs/toolkit'

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const note = state.find((note) => note.id === action.payload)
      note.important = !note.important
    },
    setNotes(_, action) {
      return action.payload
    },
  },
})

export const { createNote, toggleImportanceOf, appendNote, setNotes } =
  notesSlice.actions
export default notesSlice.reducer
