import { useDispatch } from 'react-redux'
import { vote } from '../features/anecdotes/anecdotesSlice'
import { setNotification } from '../features/notification/notificationSlice'

const AnecdoteListItem = ({ anecdote }) => {
  const dispatch = useDispatch()
  const handleVote = () => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`you voted for: ${anecdote.content}`))
  }

  return (
    <li key={anecdote.id}>
      {anecdote.content}
      <br />
      has {anecdote.votes}
      <button onClick={() => handleVote()}>vote</button>
    </li>
  )
}

export default AnecdoteListItem
