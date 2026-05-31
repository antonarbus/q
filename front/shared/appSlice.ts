import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Reducer, WritableDraft } from '@reduxjs/toolkit'
import type { ConfirmationDialogOptions } from './component/confirmation-dialog/types'

type InitState = {
  shouldLoadQuotation: {
    yesOrNo: 'yes' | 'no'
    from: 'server' | 'template' | 'restore' | 'memory' | 'draft' | undefined
  }
  isModified: boolean
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
  isModified: false,
  backgroundMessage: '',
  loadingOverlay: {
    shouldShowLoader: false,
    text: null,
  },
  confirmationDialog: {
    isOpen: false,
  },
}

// Action types from the quotation slice that represent loading (not user edits).
// Using strings here to avoid importing from entities/ into shared/ (FSD constraint).
const QUOTATION_LOAD_ACTIONS = new Set([
  'quotation/loadQuotation',
  'quotation/resetQuotation',
  'quotation/loadBlockAtPosThousand',
  'quotation/removeBlockFromPosThousand',
])

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
    // Explicitly mark the quotation as modified — used when restoring from draft/memory,
    // since loadQuotation resets isModified to false and we need to flip it back.
    setQuotationModified: (state: WritableDraft<InitState>) => {
      state.isModified = true
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
  // extraReducers lets this slice react to actions dispatched by OTHER slices.
  // Here we listen to quotation slice actions to track whether the user has
  // unsaved edits, without importing quotationSlice (which would violate FSD).
  extraReducers: (builder) => {
    // Any quotation load/reset clears the modified flag
    builder.addMatcher(
      (action) => QUOTATION_LOAD_ACTIONS.has(action.type),
      (state) => {
        state.isModified = false
      },
    )
    // Any other quotation action is a user edit — mark as modified
    builder.addMatcher(
      (action) => action.type.startsWith('quotation/') && !QUOTATION_LOAD_ACTIONS.has(action.type),
      (state) => {
        state.isModified = true
      },
    )
  },
})

export const appReducer: Reducer<InitState> = appSlice.reducer
