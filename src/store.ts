import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import login from '@features/temp/Dummy/loginSlice'
import greetings from '@features/temp/Dummy/greetingsSlice'
import users from '@features/temp/Dummy/usersSlice'
import nav from '@features/nav/navSlice'
import counter from '@features/counter/counterSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { credentialsSlice } from '@features/credentials/credentialsSlice'
import { applicationSlice } from '@features/application/applicationSlice'

export const store = configureStore({
  reducer: {
    login, // temp
    greetings, // temp
    users, // temp
    nav,
    credentials: credentialsSlice.reducer,
    application: applicationSlice.reducer,
    counter // counter from Redux example, good to have to check how redux is set
  },
  middleware: (defaultMiddleware) => defaultMiddleware({
    serializableCheck: false
  }),
  // middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction< ReturnType, RootState, unknown, Action<string> >

// hooks to let types work
export const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector
export const useDispatchTyped = () => useDispatch<AppDispatch>()
