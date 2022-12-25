import { createSlice, current } from '@reduxjs/toolkit'
import { globalObject } from '@client/globalObject'
import { OfferType } from './templateOffer'

const offerSlice = createSlice({
  name: 'offer',
  initialState: window.structuredClone(globalObject.currentOffer) as OfferType,
  reducers: {
    updateOrderAfterDrag: (state, action) => {
      const { oldItemId, oldIndex, newItemId, newIndex } = action.payload
      // console.log(current(state))
      state.items[oldItemId].pos = newIndex
      state.items[newItemId].pos = oldIndex
    }
  }
})

export default offerSlice.reducer
export const { updateOrderAfterDrag } = offerSlice.actions
