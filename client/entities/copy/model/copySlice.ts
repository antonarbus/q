import { createSlice } from '@reduxjs/toolkit'
import type { CopyPlaceType, CopyItemType } from './types'

interface Props {
  isCopyMode: boolean
  isCopyContainer: boolean
  initCords: { x: number; y: number }
  items: CopyItemType[]
  place: CopyPlaceType
  isCopying: boolean
  isPasteTextShown: boolean
}

const initialState: Props = {
  isCopyMode: false, // should tell froala & ag-grid to initialize with some delay after animation end, otherwise elements height jumps
  isCopyContainer: false,
  initCords: { x: 0, y: 0 },
  items: [],
  place: { pastePos: 'middle', itemId: 'some id' },
  isCopying: false,
  isPasteTextShown: false,
}

export const copySlice = createSlice({
  name: 'copy',
  initialState,
  reducers: {
    showCopyContainer: (state) => {
      state.isCopyContainer = true
      state.isCopyMode = true
    },
    hideCopyContainer: (state) => {
      state.isCopyContainer = false
    },
    enterIntoCopyMode: (state) => {
      state.isCopyMode = true
    },
    exitFromCopyMode: () => initialState,
    saveInitCordsOfCopyContainer: (state, action) => {
      state.initCords = action.payload
    },
    addItemIntoCopyContainer: (state, action) => {
      state.isCopying = true
      state.items.unshift(action.payload)
    },
    removeItemFromCopyContainer: (state) => {
      state.items.shift()
      state.isCopying = false
      state.place = initialState.place
    },
    updatePastePos: (state, action) => {
      state.place = action.payload
    },
    showPasteText: (state) => {
      state.isPasteTextShown = true
    },
    hidePasteText: (state) => {
      state.isPasteTextShown = false
    },
  },
})

export const {
  showCopyContainer,
  hideCopyContainer,
  saveInitCordsOfCopyContainer,
  addItemIntoCopyContainer,
  removeItemFromCopyContainer,
  updatePastePos,
  showPasteText,
  hidePasteText,
  enterIntoCopyMode,
  exitFromCopyMode,
} = copySlice.actions
export const copyReducer = copySlice.reducer
