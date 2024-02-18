import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { getDefaultOrLocalQuotation } from '../utils/getDefaultOrLocalQuotation'

const initialState = getDefaultOrLocalQuotation()

export const quotationSlice = createSlice({
  name: 'quotation',
  initialState,
  reducers: {
    // rememberLoggedUser: (state, action: PayloadAction<Props>) => {
    //   const { email, isLogged, roles } = action.payload
    //   return { ...state, email, isLogged, roles }
    // },
    // forgetLoggedUser: () => initialState,
  },
})

export const quotationReducer = quotationSlice.reducer
