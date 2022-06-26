import { useDispatch } from 'react-redux'
import { vote } from '../features/anecdotes/anecdotesSlice'
import { setNotification } from '../features/notification/notificationSlice'

const AnecdoteListItem = ({ anecdote }) => {
  const dispatch = useDispatch()
  const handleVote = async () => {
    await dispatch(vote(anecdote))
    dispatch(setNotification(`you voted for: ${anecdote.content}`, 5))
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
