import {
  createSlice,
  type PayloadAction,
  type Reducer,
  type WritableDraft,
} from '@reduxjs/toolkit'

type InitState = {
  shouldLoadQuotation: {
    yesOrNo: 'yes' | 'no'
    from: 'server' | 'template' | 'memory' | undefined
  }
  backgroundMessage: string
  loadingOverlay: {
    shouldShowLoader: boolean
    text: string | null
  }
  navigateState: {
    to?: string
    shouldSlide?: boolean
  }
}

const initialState: InitState = {
  shouldLoadQuotation: {
    yesOrNo: 'no',
    from: undefined,
  },
  backgroundMessage: '',
  loadingOverlay: {
    shouldShowLoader: false,
    text: null,
  },
  navigateState: {
    to: undefined,
    shouldSlide: undefined,
  },
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setShouldLoadQuotation: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{
        yesOrNo: InitState['shouldLoadQuotation']['yesOrNo']
        from: InitState['shouldLoadQuotation']['from']
      }>,
    ) => {
      const { yesOrNo, from } = action.payload
      state.shouldLoadQuotation.yesOrNo = yesOrNo
      state.shouldLoadQuotation.from = from
    },
    setBackgroundMessage: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{ message: InitState['backgroundMessage'] }>,
    ) => {
      const { message } = action.payload
      state.backgroundMessage = message
    },
    showLoadingOverlay: (
      state: WritableDraft<InitState>,
      action: PayloadAction<InitState['loadingOverlay']>,
    ) => {
      const { shouldShowLoader, text } = action.payload
      state.loadingOverlay.shouldShowLoader = shouldShowLoader
      state.loadingOverlay.text = text
    },
    hideLoadingOverlay: (state: WritableDraft<InitState>) => {
      state.loadingOverlay.shouldShowLoader = false
      state.loadingOverlay.text = null
    },
    setNavigateState: (
      state: WritableDraft<InitState>,
      action: PayloadAction<InitState['navigateState']>,
    ) => {
      const { to, shouldSlide } = action.payload

      if (to !== undefined) {
        state.navigateState.to = to
      }

      if (shouldSlide !== undefined) {
        state.navigateState.shouldSlide = shouldSlide
      }
    },
    resetNavigateState: (state: WritableDraft<InitState>) => {
      state.navigateState.to = undefined
      state.navigateState.shouldSlide = undefined
    },
  },
})

export const appReducer: Reducer<InitState> = appSlice.reducer
