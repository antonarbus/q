import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  isLogged: false,
  roles: ['no role'],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    rememberLoggedUser: (state, action) => {
      const { email, isLogged, roles } = action.payload
      return { ...state, email, isLogged, roles }
    },
    forgetLoggedUser: () => initialState,
  },
})

export const userReducer = userSlice.reducer
export const { rememberLoggedUser, forgetLoggedUser } = userSlice.actions
