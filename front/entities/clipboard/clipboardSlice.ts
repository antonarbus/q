import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Reducer, WritableDraft } from '@reduxjs/toolkit'
import type { CopyPlace } from './types'
import type { BlockItem } from '@back/entity/quotation/schema'

type InitState = {
  isVisible: boolean
  initCursorPos: { x: number; y: number } | null
  items: BlockItem[]
  previews: string[]
  place: CopyPlace
  isCopying: boolean
  isPasteTextShown: boolean
  isPastable: boolean
  isCopyable: boolean
  isCuttable: boolean
  isDeletable: boolean
  /** should not show copy container until images are loaded by browser */
  isPreviewPreparing: boolean
}

const initialState: InitState = {
  isVisible: false,
  initCursorPos: null,
  items: [],
  previews: [],
  place: {
    pastePos: 'middle',
    id: 'some id',
  },
  isCopying: false,
  isPasteTextShown: false,
  isPastable: false,
  isCopyable: true,
  isCuttable: true,
  isDeletable: true,
  isPreviewPreparing: false,
}

export const clipboardSlice = createSlice({
  name: 'copy',
  initialState,
  reducers: {
    setInitCursorPos: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{ x: number; y: number }>,
    ) => {
      state.initCursorPos = action.payload
    },
    showClipboardModal: (state: WritableDraft<InitState>) => {
      state.isVisible = true
    },
    startPreviewPreparing: (state: WritableDraft<InitState>) => {
      state.isPreviewPreparing = true
    },
    stopPreviewPreparing: (state: WritableDraft<InitState>) => {
      state.isPreviewPreparing = false
    },
    hideClipboardModal: () => initialState,
    addItem: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{
        item: BlockItem
        preview: string
      }>,
    ) => {
      state.isCopying = true
      state.items.unshift(action.payload.item)
      state.previews.unshift(action.payload.preview)
    },
    removeItem: (state: WritableDraft<InitState>) => {
      state.items.shift()
      state.previews.shift()
      state.isCopying = false
      state.place = initialState.place
    },
    updatePastePos: (state: WritableDraft<InitState>, action: PayloadAction<CopyPlace>) => {
      const itemIdAndWhereToPlace = action.payload
      state.place = itemIdAndWhereToPlace
    },
    showPasteText: (state: WritableDraft<InitState>) => {
      state.isPasteTextShown = true
    },
    hidePasteText: (state: WritableDraft<InitState>) => {
      state.isPasteTextShown = false
    },
    allowToPaste: (state: WritableDraft<InitState>) => {
      state.isPastable = true
    },
    forbidAllActions: (state: WritableDraft<InitState>) => {
      state.isPastable = false
      state.isCopyable = false
      state.isCuttable = false
      state.isDeletable = false
    },
    allowAllActions: (state: WritableDraft<InitState>) => {
      state.isPastable = true
      state.isCopyable = true
      state.isCuttable = true
      state.isDeletable = true
    },
  },
})

export const clipboardReducer: Reducer<InitState> = clipboardSlice.reducer
