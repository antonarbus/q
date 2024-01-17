import { configureStore } from '@reduxjs/toolkit'
import { spinnerSlice } from '@shared/ui/spinner'
import { navSlice } from '@entities/nav'
import { userSlice } from '@entities/user'
import { copySlice } from '@entities/copy'
import { itemsSlice } from '@entities/items'
import { appSlice } from '@entities/app'

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
