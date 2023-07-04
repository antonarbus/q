import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CopyPlaceType, CopyItemType, PastePosType } from './types'
import { TItem } from '../items/types'

type TProps = {
  isCopyMode: boolean
  initCords: { x: number, y: number }
  items: CopyItemType[]
  place: CopyPlaceType
  isCopying: boolean
  isPasteTextShown: boolean
}

const initialState: TProps = {
  isCopyMode: false,
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
      state.isCopyMode = true
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
      item: TItem
      itemId: string
      pastePos: PastePosType
    }>) => {
      state.isCopying = false
      state.place = initialState.place
    },
  },
})

export const { showCopyContainer, hideCopyContainer, saveInitCordsOfCopyContainer, addItemIntoCopyContainer, removeItemFromCopyContainer, updatePasteTextPos, pasteItem, showPasteText, hidePasteText } = copySlice.actions
export default copySlice.reducer
