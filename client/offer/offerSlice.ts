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
      const { id, width } = action.payload
      state.items[id].width = width
    },
    updateOrderAfterDrag: (state, action) => {
      const { oldItemId, oldIndex, newItemId, newIndex } = action.payload
      // console.log(current(state))
      state.items[oldItemId].pos = newIndex
      state.items[newItemId].pos = oldIndex
    }
  }
})

export default offerSlice.reducer
export const { updateWidth, updateOrderAfterDrag } = offerSlice.actions
