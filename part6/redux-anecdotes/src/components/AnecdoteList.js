import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { vote } from '../features/anecdotes/anecdotesSlice'

const anecdotesSelector = createSelector(
  (state) => state.anecdotes,
  (anecdotes) => [...anecdotes].sort((a, b) => b.votes - a.votes)
)

const AnecdoteList = () => {
  const anecdotes = useSelector(anecdotesSelector)
  const dispatch = useDispatch()
  const handleVote = (id) => {
    dispatch(vote(id))
  }

  return (
    <ol>
      {anecdotes.map((anecdote) => {
        return (
          <li key={anecdote.id}>
            {anecdote.content}
            <br />
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </li>
        )
      })}
    </ol>
  )
}

export default AnecdoteList
