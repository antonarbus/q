import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface IProps {
  email: string | null
  isLogged: boolean
  roles: string[]
}

const initialState: IProps = {
  email: null,
  isLogged: false,
  roles: ['no role'],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    rememberLoggedUser: (state, action: PayloadAction<IProps>) => {
      const { email, isLogged, roles } = action.payload
      return { ...state, email, isLogged, roles }
    },
    forgetLoggedUser: () => initialState,
  },
})

export const userReducer = userSlice.reducer
export const { rememberLoggedUser, forgetLoggedUser } = userSlice.actions
