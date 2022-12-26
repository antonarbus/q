import { createSlice, current } from '@reduxjs/toolkit'
import { OfferType, templateOffer } from './templateOffer'

const isOfferInLocalStorage = !!localStorage.getItem('currentOffer')
const offerFromLocalStorage = isOfferInLocalStorage && JSON.parse(localStorage.getItem('currentOffer') || '')
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
    }
  }
})

export default offerSlice.reducer
export const { updateWidth, updateOrderAfterDrag } = offerSlice.actions
