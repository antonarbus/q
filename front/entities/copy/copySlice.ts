import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Item } from '@entities/quotation'
import type { CopyPlace } from './types'

type Props = {
  isCopyContainer: boolean
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
  isCopyContainer: false,
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
    showCopyContainer: (state) => {
      state.isCopyContainer = true
    },
    hideCopyContainer: (state) => initialState,
    addItemIntoCopyContainer: (
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
    removeItemFromCopyContainer: (state) => {
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
