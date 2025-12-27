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
      state.shouldLoadQuotation.yesOrNo = action.payload.yesOrNo
      state.shouldLoadQuotation.from = action.payload.from
    },
    setBackgroundMessage: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{ message: InitState['backgroundMessage'] }>,
    ) => {
      state.backgroundMessage = action.payload.message
    },
    showLoadingOverlay: (
      state: WritableDraft<InitState>,
      action: PayloadAction<InitState['loadingOverlay']>,
    ) => {
      state.loadingOverlay.shouldShowLoader = action.payload.shouldShowLoader
      state.loadingOverlay.text = action.payload.text
    },
    hideLoadingOverlay: (state: WritableDraft<InitState>) => {
      state.loadingOverlay.shouldShowLoader = false
      state.loadingOverlay.text = null
    },
    setNavigateState: (
      state: WritableDraft<InitState>,
      action: PayloadAction<InitState['navigateState']>,
    ) => {
      if (action.payload.to !== undefined) {
        state.navigateState.to = action.payload.to
      }

      if (action.payload.shouldSlide !== undefined) {
        state.navigateState.shouldSlide = action.payload.shouldSlide
      }
    },
    resetNavigateState: (state: WritableDraft<InitState>) => {
      state.navigateState.to = undefined
      state.navigateState.shouldSlide = undefined
    },
  },
})

export const appReducer: Reducer<InitState> = appSlice.reducer
