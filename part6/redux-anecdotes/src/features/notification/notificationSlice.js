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

export const { setNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer
