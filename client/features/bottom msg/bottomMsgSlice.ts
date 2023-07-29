import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppThunk } from 'client/app/store'

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
    resetMsgOnBottom: () => initialState,
  },
})

// exports
export default bottomMsgSlice.reducer
export const { showMsgOnBottom, resetMsgOnBottom } = bottomMsgSlice.actions

// thunks
export const tellItemsSavedLocally = (ms = 2000): AppThunk => (dispatch, getState) => {
  dispatch(showMsgOnBottom('saved locally'))
  setTimeout(() => {
    dispatch(resetMsgOnBottom())
  }, ms)
}
