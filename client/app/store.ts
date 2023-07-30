import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import items from 'client/features/items/itemsSlice'
import { navReducer } from 'client/entities/nav'
import { offerReducer } from 'client/entities/offer'
import { spinnerReducer } from 'client/entities/spinner'
import { bottomMsgReducer } from 'client/entities/bottomMsg'
import { userReducer } from 'client/entities/user'
import { copyReducer } from 'client/entities/copy'

export const store = configureStore({
  reducer: {
    user: userReducer,
    nav: navReducer,
    offer: offerReducer,
    items,
    spinner: spinnerReducer,
    copy: copyReducer,
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

