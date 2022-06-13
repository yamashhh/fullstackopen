import { useDispatch } from 'react-redux'
import { addAnecdote } from '../features/anecdotes/anecdotesSlice'
import { setNotification } from '../features/notification/notificationSlice'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const anecdote = await anecdotesService.createNew(
      event.target.anecdote.value
    )
    dispatch(addAnecdote(anecdote))
    dispatch(setNotification(`anecdote added: ${anecdote.content}`))
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="anecdote" />
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
