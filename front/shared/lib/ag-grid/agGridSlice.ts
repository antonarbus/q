import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  displayedRowsCount: 0,
  loadingOverlay: {
    showLoader: false,
    text: '',
  },
}

export const agGridSlice = createSlice({
  name: 'agGrid',
  initialState,
  reducers: {
    setCount: (
      state,
      action: PayloadAction<{
        count: number
      }>,
    ) => {
      const { count } = action.payload
      state.displayedRowsCount = count
    },
    showLoadingOverlay: (
      state,
      action: PayloadAction<{
        showLoader: boolean
        text: string
      }>,
    ) => {
      const { showLoader, text } = action.payload
      state.loadingOverlay.showLoader = showLoader
      state.loadingOverlay.text = text
    },
    hideLoadingOverlay: (state) => {
      state.loadingOverlay.showLoader = false
      state.loadingOverlay.text = ''
    },
  },
})

export const agGridReducer = agGridSlice.reducer
