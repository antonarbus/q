import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  isLogged: false,
  roles: ['no role']
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
  *  here is the convention, which I do not like because of default export and not clear traceability
  *
  *  export default credentialsSlice.reducer
  *  export const { rememberLoggedUser, forgetLoggedUser } = credentialsSlice.actions
  *
  *  I like to export the whole slice instead and take all data directly from it, even it is more code
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
