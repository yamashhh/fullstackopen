import { useDispatch } from 'react-redux'
import { add } from '../features/anecdotes/anecdotesSlice'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(add(event.target.anecdote.value))
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
