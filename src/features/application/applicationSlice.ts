import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false
}

const applicationSlice = createSlice({
  name: 'applicationSlice',
  initialState,
  reducers: {
    startLoading: (state) => { state.isLoading = true }, // type: 'applicationSlice/startLoading'
    stopLoading: (state) => { state.isLoading = false } // type: 'applicationSlice/stopLoading'
  }
})

export default applicationSlice.reducer
export const { startLoading, stopLoading } = applicationSlice.actions
