import { configureStore } from '@reduxjs/toolkit'
import { appSlice } from '@entities/app'
import { copySlice } from '@entities/copy'
import { itemsSlice } from '@entities/items'
import { navSlice } from '@entities/nav'
import { userSlice } from '@entities/user'
import { spinnerSlice } from '@shared/ui/spinner'

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
