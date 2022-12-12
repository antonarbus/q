import { createSlice } from '@reduxjs/toolkit'
import { globalObject } from '@src/globalObject'
import { OfferType } from './templateOffer'

export const offerSlice = createSlice({
  name: 'offerSlice',
  initialState: window.structuredClone(globalObject.currentOffer) as OfferType,
  reducers: {
    someAction: (state, action) => {}
  }
})

export const { someAction } = offerSlice.actions
