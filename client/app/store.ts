import { configureStore } from '@reduxjs/toolkit'
import { spinnerSlice } from 'client/shared/ui/spinner'
import { navSlice } from 'client/entities/nav'
import { userSlice } from 'client/entities/user'
import { copySlice } from 'client/entities/copy'
import { itemsSlice } from 'client/entities/items'
import { appSlice } from 'client/entities/app'

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
    nav: navSlice.reducer,
    items: itemsSlice.reducer,
    spinner: spinnerSlice.reducer,
    copy: copySlice.reducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware({ serializableCheck: false }), // we have not serializable components and functions in nav structure
  devTools: process.env.NODE_ENV !== 'production',
})
