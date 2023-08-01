import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { navReducer } from 'client/entities/nav'
import { offerReducer } from 'client/entities/offer'
import { spinnerReducer } from 'client/shared/ui/spinner'
import { bottomMsgReducer } from 'client/shared/ui/bottom_msg'
import { userReducer } from 'client/entities/user'
import { copyReducer } from 'client/entities/copy'
import { itemsReducer } from 'client/entities/items'

export const store = configureStore({
  reducer: {
    user: userReducer,
    nav: navReducer,
    offer: offerReducer,
    items: itemsReducer,
    spinner: spinnerReducer,
    copy: copyReducer,
    bottomMsg: bottomMsgReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
