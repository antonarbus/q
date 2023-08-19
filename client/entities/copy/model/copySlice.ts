import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { ICopyPlace, TCopyItem } from 'client/shared/types'

interface IProps {
  isCopyMode: boolean
  isCopyContainer: boolean
  initCords: { x: number; y: number }
  items: TCopyItem[]
  place: ICopyPlace
  isCopying: boolean
  isPasteTextShown: boolean
  isPastable: boolean
  isCopyable: boolean
  isCuttable: boolean
  isDeletable: boolean
}

const initialState: IProps = {
  isCopyMode: false, // should tell froala & ag-grid to initialize with some delay after animation end, otherwise elements height jumps
  isCopyContainer: false,
  initCords: { x: 0, y: 0 },
  items: [],
  place: { pastePos: 'middle', itemId: 'some id' },
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
      state.isCopyMode = true
    },
    hideCopyContainer: (state) => {
      state.isCopyContainer = false
    },
    enterIntoCopyMode: (state) => {
      state.isCopyMode = true
    },
    exitFromCopyMode: () => initialState,
    saveInitCordsOfCopyContainer: (state, action: PayloadAction<{ x: number, y: number }>) => {
      const coords = action.payload
      state.initCords = coords
    },
    addItemIntoCopyContainer: (state, action: PayloadAction<TCopyItem>) => {
      state.isCopying = true
      const item = action.payload
      state.items.unshift(item)
    },
    removeItemFromCopyContainer: (state) => {
      state.items.shift()
      state.isCopying = false
      state.place = initialState.place
    },
    updatePastePos: (state, action: PayloadAction<ICopyPlace>) => {
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
  allowToPaste,
  forbidToPaste,
  allowToCopy,
  forbidToCopy,
  allowToCut,
  forbidToCut,
  allowToDelete,
  forbidToDelete,
} = copySlice.actions
export const copyReducer = copySlice.reducer
