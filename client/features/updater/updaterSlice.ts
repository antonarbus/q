import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  msg: '',
}

const updaterSlice = createSlice({
  name: 'updater',
  initialState,
  reducers: {
    showMsgOnBottom: (state, action: PayloadAction<string>) => {
      state.msg = action.payload
    },
    resetMsgOnBottoms: () => initialState
  }
})

export default updaterSlice.reducer
export const { showMsgOnBottom, resetMsgOnBottoms } = updaterSlice.actions
