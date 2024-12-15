import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@shared/lib/nanoid'

const initialState = {
  key: nanoid(5),
}

export const quotationKeySlice = createSlice({
  name: 'quotationKey',
  initialState,
  reducers: {
    reload: (state) => {
      state.key = nanoid(5)
    },
  },
})

export const quotationKeyReducer = quotationKeySlice.reducer
