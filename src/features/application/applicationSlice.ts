import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false
}

export const applicationSlice = createSlice({
  name: 'applicationSlice',
  initialState,
  reducers: {
    startLoading: (state) => { state.isLoading = true },
    stopLoading: (state) => { state.isLoading = false }
  }
})
