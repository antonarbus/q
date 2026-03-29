import { createSlice, type PayloadAction, type Reducer, type WritableDraft } from '@reduxjs/toolkit'

type InitState = {
  displayedRowsCount: number
  loadingOverlay: {
    showLoader: boolean
    text: string
  }
}

const initialState: InitState = {
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
      state: WritableDraft<InitState>,
      action: PayloadAction<{
        count: number
      }>,
    ) => {
      state.displayedRowsCount = action.payload.count
    },
    showLoadingOverlay: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{
        showLoader: boolean
        text: string
      }>,
    ) => {
      state.loadingOverlay.showLoader = action.payload.showLoader
      state.loadingOverlay.text = action.payload.text
    },
    hideLoadingOverlay: (state: WritableDraft<InitState>) => {
      state.loadingOverlay.showLoader = false
      state.loadingOverlay.text = ''
    },
  },
})

export const agGridReducer: Reducer<InitState> = agGridSlice.reducer
