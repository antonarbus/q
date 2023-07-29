import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppThunk } from 'client/app/store'

const initialState = {
  msg: '',
}

const bottomMsgSlice = createSlice({
  name: 'bottomMsg',
  initialState,
  reducers: {
    showMsgOnBottom: (state, action: PayloadAction<string>) => {
      state.msg = action.payload
    },
    resetMsgOnBottom: () => initialState,
  },
})

export const bottomMsgReducer = bottomMsgSlice.reducer
export const { showMsgOnBottom, resetMsgOnBottom } = bottomMsgSlice.actions

