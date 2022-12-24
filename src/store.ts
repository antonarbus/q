import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import nav from '@features/nav/navSlice'
import counter from '@features/counter/counterSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { credentialsSlice } from '@features/credentials/credentialsSlice'
import { applicationSlice } from '@features/application/applicationSlice'
import { offerSlice } from '@features/offer/offerSlice'

export const store = configureStore({
  reducer: {
    nav,
    credentials: credentialsSlice.reducer,
    application: applicationSlice.reducer,
    counter, // counter from Redux example, good to have to check how redux is set,
    offer: offerSlice.reducer
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
