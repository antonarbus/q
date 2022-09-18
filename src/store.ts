import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
// import { createLogger } from 'redux-logger'
import login from '@features/temp/Dummy/loginSlice'
import greetings from '@features/temp/Dummy/greetingsSlice'
import users from '@features/temp/Dummy/usersSlice'
import nav from '@features/nav/navSlice'
import user from '@features/credentials/credentialsSlice'
import counter from '@features/counter/counterSlice'
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
