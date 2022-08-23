import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', isError: false }
const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbar(_, action) {
      return action.payload
    },
    resetSnackbar() {
      return initialState
    },
  },
})

export const { resetSnackbar } = snackbarSlice.actions
export default snackbarSlice.reducer

let timeoutId
export const setSnackbar = (snackbar, seconds = 5) => {
  const { setSnackbar, resetSnackbar } = snackbarSlice.actions
  return (dispatch) => {
    clearTimeout(timeoutId)
    dispatch(setSnackbar(snackbar))
    timeoutId = setTimeout(() => dispatch(resetSnackbar()), seconds * 1_000)
  }
}
