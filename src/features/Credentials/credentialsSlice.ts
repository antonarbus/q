import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  isLogged: false,
  roles: ['some role']
}

export const credentialsSlice = createSlice({
  name: 'credentialsSlice',
  initialState,
  reducers: {
    rememberLoggedUser: (state, action) => {
      const { email, isLogged, roles } = action.payload
      return { ...state, email, isLogged, roles }
    },
    forgetLoggedUser: () => initialState
  }
})

/*
  *  that is the convention, which I do not like much
  *  export default credentialsSlice.reducer
  *  export const { rememberLoggedUser, forgetLoggedUser } = credentialsSlice.actions
  *
  *  instead just export the whole slice and
  *
  *  1. access in store configuration as
  *  const store = configureStore({
  *    reducer: {
  *      credentials: credentialsSlice.reducer,
  *    }
  *  })
  *
  *  2. access action object as
  *  dispatch(credentialsSlice.actions.forgetLoggedUser())
*/
