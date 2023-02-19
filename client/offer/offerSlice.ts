import { createSlice, current } from '@reduxjs/toolkit'
import { updatePastePos } from 'client/copy/copySlice'
import { CopyPlaceType, ItemType, OfferType } from 'client/types'
import { nanoid } from 'nanoid'
import { templateOffer } from './templateOffer'

const offerInLocalStorage = localStorage.getItem('currentOffer')
const offerFromLocalStorage = !!offerInLocalStorage && JSON.parse(offerInLocalStorage || '')
const initialState: OfferType = offerFromLocalStorage || templateOffer

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    updateItemOrder: (state, action) => {
      // console.log(current(state))
      const { width, index } = action.payload
      state.items[index].width = width
    },
    updateItemsOrder: (state, action) => {
      state.items = action.payload.sortedItems
    },
    paste: (state, action) => {
      const { itemId, pastePos, item } = action.payload
      const itemToPaste = { ...item, id: nanoid() }
      const hoveredItemIndex = state.items.findIndex(item => item.id === itemId)
      if (pastePos === 'top') {
        const insertAtIndex = hoveredItemIndex - 1
        state.items.splice(insertAtIndex, 0, itemToPaste)
      } else if (pastePos === 'bottom') {
        const insertAtIndex = hoveredItemIndex + 1
        state.items.splice(insertAtIndex, 0, itemToPaste)
      }
    },
  },
  extraReducers: (builder) => {
    // add or remove paste text
    builder.addCase(updatePastePos, (state, action) => {
      // respond to updatePastePos() action of copySlice, takes current state slice, but action.payload comes from copySlice
      const { pastePos, itemId }: CopyPlaceType = action.payload
      state.items = state.items.filter(item => item.type !== 'paste')
      if (pastePos === 'nowhere' || pastePos === 'middle') return
      const insertAtIndex = state.items.findIndex(item => item.id === itemId) + (pastePos === 'bottom' ? 1 : 0)
      const elToPaste: ItemType = { id: 'paste id', type: 'paste', width: 0, height: 0, innerHtml: '' }
      state.items.splice(insertAtIndex, 0, elToPaste)
    })
  }
})

export default offerSlice.reducer
export const { updateItemOrder, updateItemsOrder, paste } = offerSlice.actions
