import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from '@shared/lib/nanoid'

type State = {
  quotationKey: string
  backgroundMessage: string
  loadingOverlay: {
    showLoader: boolean
    text: string
  }
}

const initialState: State = {
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
      action: PayloadAction<{ message: State['backgroundMessage'] }>,
    ) => {
      const { message } = action.payload
      state.backgroundMessage = message
    },
    showLoadingOverlay: (
      state,
      action: PayloadAction<State['loadingOverlay']>,
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
