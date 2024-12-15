import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@shared/lib/nanoid'

const initialState = {
  quotationKey: nanoid(5),
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    reRenderQuotation: (state) => {
      state.quotationKey = nanoid(5)
    },
  },
})

export const appReducer = appSlice.reducer
