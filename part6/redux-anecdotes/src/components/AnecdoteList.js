import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import AnecdoteListItem from './AnecdoteListItem'

const anecdotesSelector = createSelector(
  (state) => state.anecdotes,
  (anecdotes) => [...anecdotes].sort((a, b) => b.votes - a.votes)
)

const AnecdoteList = () => {
  const anecdotes = useSelector(anecdotesSelector)
  const filter = useSelector((state) => state.filter)

  return (
    <ol>
      {filter
        ? anecdotes
            .filter((anecdote) =>
              anecdote.content.toLowerCase().includes(filter.toLowerCase())
            )
            .map((anecdote) => (
              <AnecdoteListItem key={anecdote.id} anecdote={anecdote} />
            ))
        : anecdotes.map((anecdote) => (
            <AnecdoteListItem key={anecdote.id} anecdote={anecdote} />
          ))}
    </ol>
  )
}

export default AnecdoteList
