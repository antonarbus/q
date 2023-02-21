import { createSlice } from '@reduxjs/toolkit'
import { CopyPlaceType, ItemType } from 'client/types'

type Props = {
  isShown: boolean,
  initCords: { x: number, y: number },
  items: ItemType[]
  place: CopyPlaceType
}

const initialState: Props = {
  isShown: false,
  initCords: { x: 0, y: 0 },
  items: [],
  place: { pastePos: 'nowhere', itemId: 'some id' }
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
      state.items.unshift(action.payload)
    },
    updatePastePos: (state, action) => {
      state.place = action.payload
    },
    removePasteText: (state) => {
      state.place = initialState.place
    },
    paste: (state, action) => {
      // this is handled in copySlice
      // const { itemId, pastePos, item } = action.payload
      // console.log({ itemId, pastePos, item })
    },
  }

})

export const { showCopyContainer, hideCopyContainer, saveInitCords, addItemIntoCopyContainer, updatePastePos, removePasteText, paste } = copySlice.actions

export default copySlice.reducer
