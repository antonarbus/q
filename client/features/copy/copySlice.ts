import { createSlice } from '@reduxjs/toolkit'
import { ItemType } from '../offer/types'
import { CopyPlaceType } from './types'

type Props = {
  isShown: boolean,
  initCords: { x: number, y: number },
  items: ItemType[],
  place: CopyPlaceType,
  isCopying: boolean
}

const initialState: Props = {
  isShown: false,
  initCords: { x: 0, y: 0 },
  items: [],
  place: { pastePos: 'nowhere', itemId: 'some id' },
  isCopying: true // flag to understand if we click to copy or paste
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
    removePasteText: (state) => {
      state.place = initialState.place
    },
    pasteItem: (state, action) => {
      state.isCopying = false
      state.place = initialState.place
    },
  }
})

export const { showCopyContainer, hideCopyContainer, saveInitCords, addItemIntoCopyContainer, removeItemFromCopyContainer, updatePasteTextPos, removePasteText, pasteItem } = copySlice.actions
export default copySlice.reducer
