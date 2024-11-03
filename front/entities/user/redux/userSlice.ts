import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../types'

type Props = {
  email: string | null
  roles: User['roles']
}

const initialState: Props = {
  email: null,
  roles: ['user'],
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
