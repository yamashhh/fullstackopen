import { useDispatch } from 'react-redux'
import { addAnecdote } from '../features/anecdotes/anecdotesSlice'
import { setNotification } from '../features/notification/notificationSlice'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addAnecdote(event.target.anecdote.value))
    dispatch(
      setNotification(`anecdote added: ${event.target.anecdote.value}`, 5)
    )
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="anecdote" required />
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
