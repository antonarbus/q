import { createSlice, current } from '@reduxjs/toolkit'
import { hideCopyContainer, pasteItem, updatePasteTextPos } from 'client/features/copy/copySlice'
import { getOfferFromLocalStorage } from 'client/modules/localStorage'
import { RootState } from 'client/store'
import { nanoid } from 'nanoid'
import { CopyPlaceType } from '../copy/types'
import { templateOffer } from '../offer/templateOffer'
import { ItemType, ItemsType } from './types'

const initialState: ItemsType = getOfferFromLocalStorage() || templateOffer

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    saveItemWidth: (state, action) => {
      const { width, index } = action.payload
      state.items[index].width = width
      // console.log(current(state))
    },
    saveItemsOrder: (state, action) => {
      state.items = action.payload.sortedItems
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePasteTextPos, (state, action) => {
        // respond to updatePastePos() action of copySlice, takes current state slice, but action.payload comes from copySlice
        const { pastePos, itemId }: CopyPlaceType = action.payload
        state.items = state.items.filter(item => item.type !== 'paste')
        if (pastePos === 'middle') return
        const insertAtIndex = state.items.findIndex(item => item.id === itemId) + (pastePos === 'bottom' ? 1 : 0)
        const elToPaste: ItemType = { id: 'paste id', type: 'paste', width: 0, height: 0, innerHtml: '' }
        state.items.splice(insertAtIndex, 0, elToPaste)
      })
      .addCase(hideCopyContainer, (state) => {
        state.items = state.items.filter(item => item.type !== 'paste')
      })
      .addCase(pasteItem, (state, action) => {
        const { itemId, pastePos, item } = action.payload
        const itemToPaste = { ...item, id: nanoid() }
        const hoveredItemIndex = state.items.findIndex(item => item.id === itemId)
        const spliceSettings = { insertAtIndex: hoveredItemIndex, deleteCount: 0 }

        if (pastePos === 'top') spliceSettings.insertAtIndex--
        if (pastePos === 'bottom') spliceSettings.insertAtIndex++
        if (pastePos === 'middle') spliceSettings.deleteCount++

        state.items = state.items.filter(item => item.type !== 'paste')
        state.items.splice(spliceSettings.insertAtIndex, spliceSettings.deleteCount, itemToPaste)
      })
  }
})

export const { saveItemWidth, saveItemsOrder, deleteItem } = itemsSlice.actions

export const selectIsLastItem = (state: RootState) => state.items.items.filter((item) => item.type !== 'paste').length === 1

export default itemsSlice.reducer
