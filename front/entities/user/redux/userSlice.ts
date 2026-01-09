import {
  createSlice,
  type PayloadAction,
  type Reducer,
  type WritableDraft,
} from '@reduxjs/toolkit'
import type { SelectUser } from '@back/entity/user/db/usersTableSchema'

type InitState = {
  email: string | null
  roles: SelectUser['roles']
  accessToken: string | null
}

const initialState: InitState = {
  email: null,
  roles: ['user'],
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
      return {
        ...state,
        email: action.payload.email,
        roles: action.payload.roles,
      }
    },
    forgetLoggedUser: () => initialState,
    setAccessToken: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{ accessToken: string | null }>,
    ) => {
      state.accessToken = action.payload.accessToken
    },
  },
})

export const userReducer: Reducer<InitState> = userSlice.reducer
