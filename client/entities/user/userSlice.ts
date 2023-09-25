import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type Props = {
  email: string | null
  isLogged: boolean
  roles: string[]
}

const initialState: Props = {
  email: null,
  isLogged: false,
  roles: ['no role'],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    rememberLoggedUser: (state, action: PayloadAction<Props>) => {
      const { email, isLogged, roles } = action.payload
      return { ...state, email, isLogged, roles }
    },
    forgetLoggedUser: () => initialState,
  },
})
