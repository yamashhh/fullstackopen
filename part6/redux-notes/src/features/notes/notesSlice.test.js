import noteReducer from './notesSlice'
import deepFreeze from 'deep-freeze'
import { add, toggleImportance } from './notesSlice'

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = []
    const content = 'the app state is in redux store'

    deepFreeze(state)
    const newState = noteReducer(state, add(content))

    expect(newState).toHaveLength(1)
    expect(newState).toMatchObject([{ content }])
  })

  test('returns new state with action TOGGLE_IMPORTANCE', () => {
    const state = [
      {
        content: 'the app state is in redux store',
        important: true,
        id: 1,
      },
      {
        content: 'state changes are made with actions',
        important: false,
        id: 2,
      },
    ]

    deepFreeze(state)
    const newState = noteReducer(state, toggleImportance(state[1].id))

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      ...state[1],
      important: true,
    })
  })
})
