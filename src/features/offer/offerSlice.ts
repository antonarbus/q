import { createSlice } from '@reduxjs/toolkit'
import { globalObject } from '@src/globalObject'
import { templateOffer } from './templateOffer'

globalObject.currentOffer = localStorage.getItem('currentOffer') === null ? { ...templateOffer } : JSON.parse(localStorage.getItem('currentOffer') || '')

export const offerSlice = createSlice({
  name: 'offerSlice',
  initialState: JSON.parse(JSON.stringify(globalObject.currentOffer)),
  reducers: {
    someAction: (state, action) => {}
  }
})

export const { someAction } = offerSlice.actions
