import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
// import { createLogger } from 'redux-logger'
import login from '@slices/loginSlice'
import greetings from '@slices/greetingsSlice'
import users from '@slices/usersSlice'
import nav from '@slices/navSlice'
import user from '@slices/userSlice'
import counter from '@components/CounterFromRedux/counterSlice'

// const logger = createLogger({}) // LOGGER MIDDLEWARE

export const store = configureStore({
  reducer: {
    login,
    greetings,
    users,
    nav,
    user,
    counter
  },
  middleware: (defaultMiddleware) => defaultMiddleware({
    serializableCheck: false
  }),
  // middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction< ReturnType, RootState, unknown, Action<string> >
