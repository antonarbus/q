import { createSlice } from '@reduxjs/toolkit'
import { CopyPlaceType, ItemType } from 'client/types'

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
  isCopying: true
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
    updatePastePos: (state, action) => {
      state.place = action.payload
    },
    removePasteText: (state) => {
      state.place = initialState.place
    },
    paste: (state, action) => {
      state.isCopying = false
      state.place = initialState.place
    },
  }

})

export const { showCopyContainer, hideCopyContainer, saveInitCords, addItemIntoCopyContainer, removeItemFromCopyContainer, updatePastePos, removePasteText, paste } = copySlice.actions

export default copySlice.reducer
