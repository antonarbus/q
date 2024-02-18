import { createSlice } from '@reduxjs/toolkit'
import { getDefaultOrLocalQuotation } from '../utils/getDefaultOrLocalQuotation'

const initialState = getDefaultOrLocalQuotation()

export const quotationSlice = createSlice({
  name: 'quotation',
  initialState,
  reducers: {
    reset: (state) => getDefaultOrLocalQuotation(),
  },
})

export const quotationReducer = quotationSlice.reducer
