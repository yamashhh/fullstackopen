import { useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../features/notes/notesSlice'
import notesService from '../services/notes'

const Note = ({ note }) => {
  const dispatch = useDispatch()
  const handleClick = async () => {
    await notesService.updateImportanceOf(note)
    dispatch(toggleImportanceOf(note.id))
  }

  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

export default Note
