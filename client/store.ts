import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import counter from 'client/features/counter/counterSlice'
import credentials from 'client/features/credentials/credentialsSlice'
import nav from 'client/features/nav/navSlice'
import offer from 'client/features/offer/offerSlice'
import spinner from 'client/features/spinner/spinnerSlice'
import copy from 'client/features/copy/copySlice'

export const store = configureStore({
  reducer: {
    counter,
    credentials,
    nav,
    offer,
    spinner,
    copy
  },
  middleware: (defaultMiddleware) => defaultMiddleware({
    serializableCheck: false
  }),
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction< ReturnType, RootState, unknown, Action<string> >

// hooks to let types work
export const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector
export const useDispatchTyped = () => useDispatch<AppDispatch>()
