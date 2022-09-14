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
    login: (state, action) => {
      const { email, isLogged, role } = action.payload
      return { ...state, email, isLogged, role }
    },
    logout: () => initialState
  }
})

export default userSlice.reducer
export const {
  login,
  logout
} = userSlice.actions
