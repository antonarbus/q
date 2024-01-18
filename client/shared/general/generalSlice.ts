import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    reRenderOffer: false,
    isFroala: true,
    bottomMsg: '',
  },
  reducers: {
    reRenderOffer: (state) => {
      state.reRenderOffer = !state.reRenderOffer
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
