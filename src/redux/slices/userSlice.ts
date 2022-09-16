import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  isLogged: false,
  role: null
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    rememberLoggedUser: (state, action) => {
      const { email, isLogged, role } = action.payload
      return { ...state, email, isLogged, role }
    },
    forgetLoggedUser: () => initialState
  }
})

export default userSlice.reducer
export const { rememberLoggedUser, forgetLoggedUser } = userSlice.actions
