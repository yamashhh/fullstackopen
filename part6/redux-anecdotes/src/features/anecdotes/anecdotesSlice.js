import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  extraReducers(builder) {
    builder
      .addCase(initializeAnecdotes.fulfilled, (_, action) => {
        return action.payload
      })
      .addCase(addAnecdote.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(vote.fulfilled, (state, action) => {
        state.splice(
          state.findIndex((anecdote) => anecdote.id === action.payload.id),
          1,
          action.payload
        )
      })
  },
})

export default anecdotesSlice.reducer

export const initializeAnecdotes = createAsyncThunk(
  'anecdotes/initializeAnecdotes',
  async () => {
    const anecdotes = await anecdotesService.getAll()
    return anecdotes
  }
)

export const addAnecdote = createAsyncThunk(
  'anecdotes/addAnecdote',
  async (content) => {
    const anecdote = await anecdotesService.createNew(content)
    return anecdote
  }
)

export const vote = createAsyncThunk('anecdotes/vote', async (anecdote) => {
  const response = await anecdotesService.vote(anecdote)
  return response
})
