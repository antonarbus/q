import { createSlice } from '@reduxjs/toolkit'
import { globalObject } from '@src/globalObject'
import { OfferType } from './templateOffer'

const offerSlice = createSlice({
  name: 'offerSlice',
  initialState: window.structuredClone(globalObject.currentOffer) as OfferType,
  reducers: {
    someAction: (state, action) => {}
  }
})

export default offerSlice.reducer
export const { someAction } = offerSlice.actions
