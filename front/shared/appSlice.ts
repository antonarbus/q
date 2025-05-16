import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  shouldLoadQuotation: {
    yesOrNo: 'yes' | 'no'
    from: 'server' | 'template' | 'memory' | undefined
  }
  backgroundMessage: string
  loadingOverlay: {
    showLoader: boolean
    text: string
  }
}

const initialState: State = {
  shouldLoadQuotation: {
    yesOrNo: 'no',
    from: undefined,
  },
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
    setShouldLoadQuotation: (
      state,
      action: PayloadAction<{
        yesOrNo: State['shouldLoadQuotation']['yesOrNo']
        from: State['shouldLoadQuotation']['from']
      }>,
    ) => {
      const { yesOrNo, from } = action.payload
      state.shouldLoadQuotation.yesOrNo = yesOrNo
      state.shouldLoadQuotation.from = from
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
