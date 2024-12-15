import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isEditable: true,
}

export const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setEditable: (state) => {
      state.isEditable = true
    },
    setNotEditable: (state) => {
      state.isEditable = false
    },
  },
})

export const textReducer = textSlice.reducer
