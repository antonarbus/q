import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { navSlice } from 'client/entities/nav'
import { spinnerSlice } from 'client/shared/ui/spinner'
import { bottomMsgSlice } from 'client/shared/ui/bottom_msg'
import { userSlice } from 'client/entities/user'
import { copySlice } from 'client/entities/copy'
import { itemsSlice } from 'client/entities/items'
import { offerSlice } from 'client/entities/offer'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    nav: navSlice.reducer,
    offer: offerSlice.reducer,
    items: itemsSlice.reducer,
    spinner: spinnerSlice.reducer,
    copy: copySlice.reducer,
    bottomMsg: bottomMsgSlice.reducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
})


