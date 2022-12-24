import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import application from '@features/application/applicationSlice'
import counter from '@features/counter/counterSlice'
import credentials from '@features/credentials/credentialsSlice'
import nav from '@features/nav/navSlice'
import offer from '@features/offer/offerSlice'

export const store = configureStore({
  reducer: {
    application,
    counter,
    credentials,
    nav,
    offer
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
