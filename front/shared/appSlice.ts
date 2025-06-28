import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  shouldLoadQuotation: {
    yesOrNo: 'yes' | 'no'
    from: 'server' | 'template' | 'memory' | undefined
  }
  backgroundMessage: string
  loadingOverlay: {
    shouldShowLoader: boolean
    text: string | null
  }
  navigate: {
    from?: string
    to?: string
    shouldSlide?: boolean
  }
}

const initialState: State = {
  shouldLoadQuotation: {
    yesOrNo: 'no',
    from: undefined,
  },
  backgroundMessage: '',
  loadingOverlay: {
    shouldShowLoader: false,
    text: null,
  },
  navigate: {
    from: '/',
    to: '/',
    shouldSlide: false,
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
      const { shouldShowLoader, text } = action.payload
      state.loadingOverlay.shouldShowLoader = shouldShowLoader
      state.loadingOverlay.text = text
    },
    hideLoadingOverlay: (state) => {
      state.loadingOverlay.shouldShowLoader = false
      state.loadingOverlay.text = null
    },
    setNavigate: (state, action: PayloadAction<State['navigate']>) => {
      const { from, to, shouldSlide } = action.payload

      if (from !== undefined) {
        state.navigate.from = from
      }

      if (to !== undefined) {
        state.navigate.to = to
      }

      if (shouldSlide !== undefined) {
        state.navigate.shouldSlide = shouldSlide
      }
    },
  },
})

export const appReducer = appSlice.reducer
