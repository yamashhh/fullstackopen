import { useDispatch } from 'react-redux'
import { add } from '../features/notes/notesSlice'

const NewNote = (props) => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    dispatch(add(content))
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
