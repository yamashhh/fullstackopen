import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import notesService from './services/notes'
import { setNotes } from './features/notes/notesSlice'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await notesService.getAll()
      dispatch(setNotes(notes))
    }
    fetchNotes()
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
