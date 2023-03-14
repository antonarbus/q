import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ItemType } from '../items/types'
import { CopyPlaceType, PasteItemType } from './types'

type Props = {
  isShown: boolean,
  initCords: { x: number, y: number },
  items: ItemType[],
  place: CopyPlaceType,
  isCopying: boolean,
  isPasteTextShown: boolean
}

const initialState: Props = {
  isShown: false,
  initCords: { x: 0, y: 0 },
  items: [],
  place: { pastePos: 'nowhere', itemId: 'some id' },
  isCopying: true, // flag to understand if we click to copy or paste
  isPasteTextShown: false
}

export const copySlice = createSlice({
  name: 'copy',
  initialState,
  reducers: {
    showCopyContainer: (state) => {
      state.isShown = true
    },
    hideCopyContainer: () => initialState,
    saveInitCords: (state, action) => {
      state.initCords = action.payload
    },
    addItemIntoCopyContainer: (state, action) => {
      state.isCopying = true
      state.items.unshift(action.payload)
    },
    removeItemFromCopyContainer: (state) => {
      state.items.shift()
    },
    updatePasteTextPos: (state, action) => {
      state.place = action.payload
    },
    showPasteText: (state) => {
      state.isPasteTextShown = true
    },
    hidePasteText: (state) => {
      state.isPasteTextShown = false
    },
    pasteItem: (state, action: PayloadAction<PasteItemType>) => {
      state.isCopying = false
      state.place = initialState.place
    },
  }
})

export const { showCopyContainer, hideCopyContainer, saveInitCords, addItemIntoCopyContainer, removeItemFromCopyContainer, updatePasteTextPos, pasteItem, showPasteText, hidePasteText } = copySlice.actions
export default copySlice.reducer
