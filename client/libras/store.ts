import { configureStore } from '@reduxjs/toolkit'
import { copySlice } from '@entities/copy'
import { itemsSlice } from '@entities/items'
import { navSlice } from '@entities/nav'
import { spinnerSlice } from '@entities/spinner'
import { userSlice } from '@entities/user'
import { generalSlice } from '@shared/general'

export const store = configureStore({
  reducer: {
    app: generalSlice.reducer,
    user: userSlice.reducer,
    nav: navSlice.reducer,
    items: itemsSlice.reducer,
    spinner: spinnerSlice.reducer,
    copy: copySlice.reducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware({ serializableCheck: false }), // we have not serializable components and functions in nav structure
  devTools: process.env.NODE_ENV !== 'production',
})

export const getState = store.getState
export const dispatch = store.dispatch
