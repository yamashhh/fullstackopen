import { createSelector } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportance } from '../features/notes/notesSlice'

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const notesSelector = createSelector(
  (state) => state.filter,
  (state) => state.notes,
  (filter, notes) => {
    if (filter === 'IMPORTANT') {
      return notes.filter((note) => note.important)
    }
    if (filter === 'NON_IMPORTANT') {
      return notes.filter((note) => !note.important)
    }
    return notes
  }
)

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(notesSelector)

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportance(note.id))}
        />
      ))}
    </ul>
  )
}

export default Notes
