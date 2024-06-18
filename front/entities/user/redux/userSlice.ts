import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type Props = {
  email: string | null
  roles: string[]
}

const initialState: Props = {
  email: null,
  roles: ['no role'],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    rememberLoggedUser: (state, action: PayloadAction<Props>) => {
      const { email, roles } = action.payload
      return { ...state, email, roles }
    },
    forgetLoggedUser: () => initialState,
  },
})

export const userReducer = userSlice.reducer
