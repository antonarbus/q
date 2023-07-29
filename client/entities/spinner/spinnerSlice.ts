import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  text: '',
}

const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    startSpinner: (state, action) => {
      state.isLoading = true
      state.text = action.payload?.text
    },
    stopSpinner: () => initialState,
  },
})

export const spinnerReducer = spinnerSlice.reducer
export const { startSpinner, stopSpinner } = spinnerSlice.actions
