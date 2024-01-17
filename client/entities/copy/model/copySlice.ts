import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { CopyPlace, Copyable } from '@shared/types'

type Props = {
  isCopyContainer: boolean
  initCords: { x: number, y: number }
  items: Copyable[]
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
    itemId: 'some id',
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
    saveInitCordsOfCopyContainer: (state, action: PayloadAction<{ x: number, y: number }>) => {
      const coords = action.payload
      state.initCords = coords
    },
    addItemIntoCopyContainer: (state, action: PayloadAction<{
      copyItem: Copyable
      preview: string
    }>) => {
      const { copyItem, preview } = action.payload
      state.isCopying = true
      state.items.unshift(copyItem)
      state.previews.unshift(preview)
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
    forbidToPaste: (state) => {
      state.isPastable = false
    },
    allowToCopy: (state) => {
      state.isCopyable = true
    },
    forbidToCopy: (state) => {
      state.isCopyable = false
    },
    allowToCut: (state) => {
      state.isCuttable = true
    },
    forbidToCut: (state) => {
      state.isCuttable = false
    },
    allowToDelete: (state) => {
      state.isDeletable = true
    },
    forbidToDelete: (state) => {
      state.isDeletable = false
    },
  },
})
