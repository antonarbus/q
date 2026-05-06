import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Reducer, WritableDraft } from '@reduxjs/toolkit'

type InitState = {
  isOpen: boolean
  blockIndex: number
  rowIndex: number
}

const initialState: InitState = {
  isOpen: false,
  blockIndex: 0,
  rowIndex: 0,
}

export const aiSuggestRowSlice = createSlice({
  name: 'aiSuggestRow',
  initialState,
  reducers: {
    open: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{ blockIndex: number; rowIndex: number }>,
    ) => {
      state.isOpen = true
      state.blockIndex = action.payload.blockIndex
      state.rowIndex = action.payload.rowIndex
    },
    close: () => initialState,
  },
})

export const aiSuggestRowReducer: Reducer<InitState> = aiSuggestRowSlice.reducer
