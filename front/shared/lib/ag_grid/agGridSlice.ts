import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  displayedRowsCount: 0,
}

export const agGridSlice = createSlice({
  name: 'agGrid',
  initialState,
  reducers: {
    setCount: (
      state,
      action: PayloadAction<{
        count: number
      }>,
    ) => {
      const { count } = action.payload
      state.displayedRowsCount = count
    },
  },
})

export const agGridReducer = agGridSlice.reducer
