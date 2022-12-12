import { createSlice } from '@reduxjs/toolkit'
import { globalObject } from '@src/globalObject'

export const offerSlice = createSlice({
  name: 'offerSlice',
  initialState: window.structuredClone(globalObject.currentOffer),
  reducers: {
    someAction: (state, action) => {}
  }
})

export const { someAction } = offerSlice.actions
