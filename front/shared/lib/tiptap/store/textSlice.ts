import { createSlice, type Reducer, type WritableDraft } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

type InitState = {
  subtotalTrigger: string
}

const initialState: InitState = {
  subtotalTrigger: nanoid(5),
}

export const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    triggerSubtotalUpdate: (state: WritableDraft<InitState>) => {
      state.subtotalTrigger = nanoid(5)
    },
  },
})

export const textReducer: Reducer<InitState> = textSlice.reducer
