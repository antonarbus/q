import type { Item } from '@entities/quotation'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CopyPlace } from './types'

type Props = {
  isVisible: boolean
  initCords: { x: number; y: number }
  items: Item[]
  previews: string[]
  place: CopyPlace
  isCopying: boolean
  isPasteTextShown: boolean
  isPastable: boolean
  isCopyable: boolean
  isCuttable: boolean
  isDeletable: boolean
}

const initialState: Props = {
  isVisible: false,
  initCords: { x: 0, y: 0 },
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
}

export const copySlice = createSlice({
  name: 'copy',
  initialState,
  reducers: {
    showCopyModal: (state) => {
      state.isVisible = true
    },
    hideCopyModal: (state) => initialState,
    addItem: (
      state,
      action: PayloadAction<{
        item: Item
      }>,
    ) => {
      const { item } = action.payload
      state.isCopying = true
      state.items.unshift(item)
      state.previews.unshift(item.preview ?? '')
    },
    removeItem: (state) => {
      state.items.shift()
      state.previews.shift()
      state.isCopying = false
      state.place = initialState.place
    },
    updatePastePos: (state, action: PayloadAction<CopyPlace>) => {
      const itemIdAndWhereToPlace = action.payload
      state.place = itemIdAndWhereToPlace
    },
    showPasteText: (state) => {
      state.isPasteTextShown = true
    },
    hidePasteText: (state) => {
      state.isPasteTextShown = false
    },
    allowToPaste: (state) => {
      state.isPastable = true
    },
    forbidAllActions: (state) => {
      state.isPastable = false
      state.isCopyable = false
      state.isCuttable = false
      state.isDeletable = false
    },
    allowAllActions: (state) => {
      state.isPastable = true
      state.isCopyable = true
      state.isCuttable = true
      state.isDeletable = true
    },
  },
})

export const copyReducer = copySlice.reducer
