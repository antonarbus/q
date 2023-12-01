import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    reLoadOfferFlag: true,
    isFroala: true,
    bottomMsg: '',
  },
  reducers: {
    reLoadOffer: (state) => {
      state.reLoadOfferFlag = !state.reLoadOfferFlag
    },
    enableFroala: (state) => {
      state.isFroala = true
    },
    disableFroala: (state) => {
      state.isFroala = false
    },
    showBottomMsg: (state, action: PayloadAction<string>) => {
      state.bottomMsg = action.payload
    },
    hideBottomMsg: (state) => {
      state.bottomMsg = ''
    },
  },
})
