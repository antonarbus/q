import { createSlice } from '@reduxjs/toolkit'
import { ItemType } from 'client/offer/templateOffer'

type Props = {
  isShown: boolean,
  initCords: { x: number, y: number },
  items: ItemType[]
  place: {
    pastePos: 'top' | 'middle' | 'bottom'
    itemId: string
  }
}

const initialState: Props = {
  isShown: false,
  initCords: { x: 0, y: 0 },
  items: [],
  place: { pastePos: 'top', itemId: 'some id' }
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
    savePastePlace: (state, action) => {
      state.place = action.payload
    },
  }

})

export const { showCopyContainer, hideCopyContainer, saveInitCords, addItemIntoCopyContainer, savePastePlace } = copySlice.actions

export default copySlice.reducer
