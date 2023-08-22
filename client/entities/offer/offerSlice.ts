import { createSlice } from '@reduxjs/toolkit'

export const offerSlice = createSlice({
  name: 'offer',
  initialState: {
    toggleOffer: true,
  },
  reducers: {
    reloadOffer: (state) => {
      state.toggleOffer = !state.toggleOffer
    },
  },
})

