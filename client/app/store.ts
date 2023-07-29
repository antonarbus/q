import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import credentials from 'client/features/credentials/credentialsSlice'
import items from 'client/features/items/itemsSlice'
import spinner from 'client/features/spinner/spinnerSlice'
import copy from 'client/features/copy/copySlice'
import offer from 'client/features/offer/offerSlice'
import updater from 'client/features/bottom msg/bottomMsgSlice'
import { navReducer } from 'client/entities/nav'

export const store = configureStore({
  reducer: {
    credentials,
    nav: navReducer,
    offer,
    items,
    spinner,
    copy,
    updater,
  },
  middleware: (defaultMiddleware) => defaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction< ReturnType, RootState, unknown, Action<string> >

