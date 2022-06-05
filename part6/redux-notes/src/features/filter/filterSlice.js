import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'ALL',
  reducers: {
    filter(_, action) {
      return action.payload
    },
  },
})

export const { filter } = filterSlice.actions
export default filterSlice.reducer
