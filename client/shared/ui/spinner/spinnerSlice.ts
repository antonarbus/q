import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  text: '',
}

const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    startSpinner: (state, action: PayloadAction<{ text: string | undefined }>) => {
      state.isLoading = true
      state.text = action.payload.text ?? ''
    },
    stopSpinner: () => initialState,
  },
})

export const spinnerReducer = spinnerSlice.reducer
export const { startSpinner, stopSpinner } = spinnerSlice.actions
