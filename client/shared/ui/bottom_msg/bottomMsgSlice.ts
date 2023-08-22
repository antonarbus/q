import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  msg: '',
}

export const bottomMsgSlice = createSlice({
  name: 'bottomMsg',
  initialState,
  reducers: {
    showMsgOnBottom: (state, action: PayloadAction<string>) => {
      state.msg = action.payload
    },
    resetMsgOnBottom: () => initialState,
  },
})
