import {
  createSlice,
  type PayloadAction,
  type Reducer,
  type WritableDraft,
} from '@reduxjs/toolkit'
import { userRole } from '../const/userRole'
import type { SelectUser } from '@back/entities/user'

type InitState = {
  email: string | null
  roles: SelectUser['roles']
  accessToken: string | null
}

const initialState: InitState = {
  email: null,
  roles: [userRole.user],
  accessToken: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    rememberLoggedUser: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{
        email: string | null
        roles: SelectUser['roles']
      }>,
    ) => {
      const { email, roles } = action.payload

      return { ...state, email, roles }
    },
    forgetLoggedUser: () => initialState,
    setAccessToken: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{ accessToken: string | null }>,
    ) => {
      const { accessToken } = action.payload
      state.accessToken = accessToken
    },
  },
})

export const userReducer: Reducer<InitState> = userSlice.reducer
