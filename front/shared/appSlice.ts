import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from '@shared/lib/nanoid'

const initialState = {
  quotationKey: nanoid(5),
  backgroundMessage: '',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    reRenderQuotation: (state) => {
      state.quotationKey = nanoid(5)
    },
    setBackgroundMessage: (
      state,
      action: PayloadAction<{ message: string }>,
    ) => {
      const { message } = action.payload
      state.backgroundMessage = message
    },
  },
})

export const appReducer = appSlice.reducer
