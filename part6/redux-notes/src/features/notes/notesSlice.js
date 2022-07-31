import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import notesService from '../../services/notes'

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      const note = state.find((note) => note.id === action.payload)
      note.important = !note.important
    },
    setNotes(_, action) {
      return action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(initializeNotes.fulfilled, (_, action) => {
        return action.payload
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.push(action.payload)
      })
  },
})

export const { toggleImportanceOf, appendNote, setNotes } = notesSlice.actions

export const initializeNotes = createAsyncThunk(
  'notes/initializeNotes',
  async () => {
    const notes = await notesService.getAll()
    return notes
  }
)

export const createNote = createAsyncThunk(
  'notes/createNote',
  async (content) => {
    const note = await notesService.createNew(content)
    return note
  }
)

export default notesSlice.reducer
