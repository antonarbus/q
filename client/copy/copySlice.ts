import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isShown: false,
  initCords: { x: 0, y: 0 }
}

export const copySlice = createSlice({
  name: 'copy',
  initialState,
  reducers: {
    showCopyContainer: (state) => {
      state.isShown = true
    },
    hideCopyContainer: (state) => {
      state.isShown = false
    },
    saveInitCords: (state, action) => {
      state.initCords = action.payload
    }
  }

})

export const { showCopyContainer, hideCopyContainer, saveInitCords } = copySlice.actions

export default copySlice.reducer
