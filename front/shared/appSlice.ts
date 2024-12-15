import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from '@shared/lib/nanoid'

const initialState = {
  quotationKey: nanoid(5),
  backgroundMessage: '',
  loadingOverlay: {
    showLoader: false,
    text: '',
  },
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    reRenderQuotation: (state) => {
      state.quotationKey = nanoid(5)
    },
    setBackgroundMessage: (
      state,
      action: PayloadAction<{ message: string }>,
    ) => {
      const { message } = action.payload
      state.backgroundMessage = message
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

export const appReducer = appSlice.reducer
