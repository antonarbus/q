import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import credentials from 'client/features/credentials/credentialsSlice'
import items from 'client/features/items/itemsSlice'
import copy from 'client/features/copy/copySlice'
import { navReducer } from 'client/entities/nav'
import { offerReducer } from 'client/entities/offer'
import { spinnerReducer } from 'client/entities/spinner'
import { bottomMsgReducer } from 'client/entities/bottomMsg'

export const store = configureStore({
  reducer: {
    credentials,
    nav: navReducer,
    offer: offerReducer,
    items,
    spinner: spinnerReducer,
    copy,
    bottomMsg: bottomMsgReducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction< ReturnType, RootState, unknown, Action<string> >

