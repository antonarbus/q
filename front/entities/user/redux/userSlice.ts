import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../types'
import { userRole } from '../const/userRole'

type InitialState = {
  email: string | null
  roles: User['roles']
  accessToken: string | null
}

const initialState: InitialState = {
  email: null,
  roles: [userRole.user],
  accessToken: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    rememberLoggedUser: (
      state,
      action: PayloadAction<{
        email: string | null
        roles: User['roles']
      }>,
    ) => {
      const { email, roles } = action.payload

      return { ...state, email, roles }
    },
    forgetLoggedUser: () => initialState,
    setAccessToken: (
      state,
      action: PayloadAction<{ accessToken: string | null }>,
    ) => {
      const { accessToken } = action.payload
      state.accessToken = accessToken
    },
  },
})

export const userReducer = userSlice.reducer
