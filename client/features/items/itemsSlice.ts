import { createSlice, current } from '@reduxjs/toolkit'
import { hideCopyContainer, pasteItem, updatePasteTextPos } from 'client/features/copy/copySlice'
import { getItemsFromLocalStorage } from 'client/modules/localStorage'
import { RootState } from 'client/store'
import { nanoid } from 'nanoid'
import { CopyPlaceType } from '../copy/types'
import { templateOffer } from '../offer/templateOffer'
import { ItemType, ItemsType } from './types'

//! think about splitting offer slice into items slice + offer slice + others
//! save whole store in localStorage
const initialState: ItemsType = getItemsFromLocalStorage()

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    saveItemWidth: (state, action) => {
      const { width, index } = action.payload
      state[index].width = width
      // console.log(current(state))
    },
    saveItemsOrder: (state, action) => action.payload.sortedItems,
    deleteItem: (state, action) => state.filter(item => item.id !== action.payload.id),
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePasteTextPos, (state, action) => {
        // respond to updatePastePos() action of copySlice, takes current state slice, but action.payload comes from copySlice
        const { pastePos, itemId }: CopyPlaceType = action.payload
        state = state.filter(item => item.type !== 'paste')
        if (pastePos === 'middle') return
        const insertAtIndex = state.findIndex(item => item.id === itemId) + (pastePos === 'bottom' ? 1 : 0)
        const elToPaste: ItemType = { id: 'paste id', type: 'paste', width: 0, height: 0, innerHtml: '' }
        state.splice(insertAtIndex, 0, elToPaste)
      })
      .addCase(hideCopyContainer, (state) => {
        state = state.filter(item => item.type !== 'paste')
      })
      .addCase(pasteItem, (state, action) => {
        const { itemId, pastePos, item } = action.payload
        const itemToPaste = { ...item, id: nanoid() }
        const hoveredItemIndex = state.findIndex(item => item.id === itemId)
        const spliceSettings = { insertAtIndex: hoveredItemIndex, deleteCount: 0 }

        if (pastePos === 'top') spliceSettings.insertAtIndex--
        if (pastePos === 'bottom') spliceSettings.insertAtIndex++
        if (pastePos === 'middle') spliceSettings.deleteCount++

        state = state.filter(item => item.type !== 'paste')
        state.splice(spliceSettings.insertAtIndex, spliceSettings.deleteCount, itemToPaste)
      })
  }
})

export const { saveItemWidth, saveItemsOrder, deleteItem } = itemsSlice.actions

export const selectIsLastItem = (state: RootState) => state.items.filter((item) => item.type !== 'paste').length === 1

export default itemsSlice.reducer
