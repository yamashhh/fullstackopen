import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setAnecdotes } from './features/anecdotes/anecdotesSlice'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchAnecdotes = async () => {
      const anecdotes = await anecdotesService.getAll()
      dispatch(setAnecdotes(anecdotes))
    }
    fetchAnecdotes()
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
