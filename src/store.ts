import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import counter from '@src/counter/counterSlice'
import credentials from '@src/credentials/credentialsSlice'
import nav from '@src/nav/navSlice'
import offer from '@src/offer/offerSlice'
import spinner from '@src/spinner/spinnerSlice'

export const store = configureStore({
  reducer: {
    counter,
    credentials,
    nav,
    offer,
    spinner
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
