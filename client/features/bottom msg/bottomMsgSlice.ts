import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  msg: '',
}

const bottomMsgSlice = createSlice({
  name: 'updater',
  initialState,
  reducers: {
    showMsgOnBottom: (state, action: PayloadAction<string>) => {
      state.msg = action.payload
    },
    resetMsgOnBottom: () => initialState
  }
})

export default bottomMsgSlice.reducer
export const { showMsgOnBottom, resetMsgOnBottom } = bottomMsgSlice.actions
