import { createSlice } from '@reduxjs/toolkit'

const offerSlice = createSlice({
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

export const { reloadOffer } = offerSlice.actions

export default offerSlice.reducer
