import { useDispatch } from 'react-redux'
import { createNote } from '../features/notes/notesSlice'
import notesService from '../services/notes'

const NewNote = (props) => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    const note = await notesService.createNew(content)
    dispatch(createNote(note))
    event.target.note.value = ''
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote
