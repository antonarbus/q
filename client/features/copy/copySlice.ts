import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CopyPlaceType, CopyItemType, PastePosType } from './types'
import { ItemType } from '../items/types'

type Props = {
  isShown: boolean
  initCords: { x: number, y: number }
  items: CopyItemType[]
  place: CopyPlaceType
  isCopying: boolean
  isPasteTextShown: boolean
}

const initialState: Props = {
  isShown: false,
  initCords: { x: 0, y: 0 },
  items: [],
  place: { pastePos: 'middle', itemId: 'some id' },
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
    saveInitCordsOfCopyContainer: (state, action) => {
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
    pasteItem: (state, action: PayloadAction<{
      item: ItemType
      itemId: string
      pastePos: PastePosType
    }>) => {
      console.log(666)
      console.log(action.payload)
      state.isCopying = false
      state.place = initialState.place
    },
  }
})

export const { showCopyContainer, hideCopyContainer, saveInitCordsOfCopyContainer, addItemIntoCopyContainer, removeItemFromCopyContainer, updatePasteTextPos, pasteItem, showPasteText, hidePasteText } = copySlice.actions
export default copySlice.reducer
