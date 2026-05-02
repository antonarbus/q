import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Reducer, WritableDraft } from '@reduxjs/toolkit'
import type { ConfirmationDialogOptions } from './component/confirmation-dialog/types'

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
  confirmationDialog: ConfirmationDialogOptions & { isOpen: boolean }
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
  confirmationDialog: {
    isOpen: false,
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
    openConfirmationDialog: (state, action: PayloadAction<ConfirmationDialogOptions>) => {
      state.confirmationDialog = { isOpen: true, ...action.payload }
    },
    closeConfirmationDialog: (state) => {
      state.confirmationDialog.isOpen = false
    },
  },
})

export const appReducer: Reducer<InitState> = appSlice.reducer
