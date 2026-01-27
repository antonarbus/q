import { createSlice, type Reducer, type WritableDraft } from '@reduxjs/toolkit'

type InitState = {
  isEditable: boolean
}

const initialState: InitState = {
  isEditable: true,
}

export const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setEditable: (state: WritableDraft<InitState>) => {
      state.isEditable = true
    },
    setNotEditable: (state: WritableDraft<InitState>) => {
      state.isEditable = false
    },
  },
})

export const textReducer: Reducer<InitState> = textSlice.reducer
