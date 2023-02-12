import { createSlice, current } from '@reduxjs/toolkit'
import { OfferType, templateOffer } from './templateOffer'

const offerInLocalStorage = localStorage.getItem('currentOffer')
const offerFromLocalStorage = !!offerInLocalStorage && JSON.parse(offerInLocalStorage || '')
const initialState: OfferType = offerFromLocalStorage || templateOffer

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    updateWidth: (state, action) => {
      const { width, index } = action.payload
      state.items[index].width = width
    },
    updateOrderAfterDrag: (state, action) => {
      state.items = action.payload.sortedItems
    },
    movePasteText: (state, action) => {
      const { pastePos, pasteId } = action.payload
      console.log({ pastePos, pasteId })
      // state.items.unshift(action.payload)
    },
  }
})

export default offerSlice.reducer
export const { updateWidth, updateOrderAfterDrag, movePasteText } = offerSlice.actions
