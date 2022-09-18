import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
// import { createLogger } from 'redux-logger'
import login from '@components/Main/Dummy/loginSlice'
import greetings from '@components/Main/Dummy/greetingsSlice'
import users from '@components/Main/Dummy/usersSlice'
import nav from '@components/Nav/navSlice'
import user from '@components/Credentials/credentialsSlice'
import counter from '@components/CounterFromRedux/counterSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

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

// hooks to let types work
export const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector
export const useDispatchTyped = () => useDispatch<AppDispatch>()
