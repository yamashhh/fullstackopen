import { createSlice } from '@reduxjs/toolkit'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const anecdote = state.find((anecdote) => anecdote.id === action.payload)
      anecdote.votes += 1
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(_, action) {
      return action.payload
    },
  },
})

export const { vote, addAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer
