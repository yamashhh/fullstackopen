import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(_, action) {
      return action.payload
    },
    resetNotification() {
      return ''
    },
  },
})

export const { resetNotification } = notificationSlice.actions
export default notificationSlice.reducer

let timer
export const setNotification = (notification, seconds) => {
  const { setNotification, resetNotification } = notificationSlice.actions
  return (dispatch) => {
    clearTimeout(timer)
    dispatch(setNotification(notification))
    timer = setTimeout(() => {
      dispatch(resetNotification())
    }, seconds * 1_000)
  }
}
