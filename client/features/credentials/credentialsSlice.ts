import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  isLogged: false,
  roles: ['no role']
}

const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    rememberLoggedUser: (state, action) => {
      const { email, isLogged, roles } = action.payload
      return { ...state, email, isLogged, roles }
    },
    forgetLoggedUser: () => initialState
  }
})

export default credentialsSlice.reducer
export const { rememberLoggedUser, forgetLoggedUser } = credentialsSlice.actions
