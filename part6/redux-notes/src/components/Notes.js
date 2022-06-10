import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import Note from './Note'

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
  const notes = useSelector(notesSelector)

  return (
    <ul>
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </ul>
  )
}

export default Notes
