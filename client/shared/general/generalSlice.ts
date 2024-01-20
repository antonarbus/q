import { createSlice } from '@reduxjs/toolkit'

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    reRenderOffer: false,
    isFroala: true,
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
  },
})

export const generalReducer = generalSlice.reducer
