import { connect } from 'react-redux'
import { addAnecdote } from '../features/anecdotes/anecdotesSlice'
import { setNotification } from '../features/notification/notificationSlice'

const AnecdoteForm = ({ addAnecdote, setNotification }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    addAnecdote(event.target.anecdote.value)
    setNotification(`anecdote added: ${event.target.anecdote.value}`, 5)
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="anecdote" required />
      <button type="submit">create</button>
    </form>
  )
}

const mapDispatchToProps = {
  addAnecdote,
  setNotification,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
