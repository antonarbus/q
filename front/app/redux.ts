import { configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { copyReducer } from '@entities/copy/copySlice'
import { quotationReducer } from '@entities/quotation/redux/quotationSlice'
import { userReducer } from '@entities/user/redux/userSlice'
import { navReducer } from '@shared/nav/navSlice'
import { instantiateStore } from '@shared/lib/redux'
import { agGridReducer } from '@shared/lib/ag_grid/agGridSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    nav: navReducer,
    quotation: quotationReducer,
    copy: copyReducer,
    agGrid: agGridReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({ serializableCheck: false }), // we have not serializable components and functions in nav structure
  devTools: process.env.NODE_ENV !== 'production',
})

export type Store = typeof store
export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export type GetState = typeof store.getState
export type UseSelector = TypedUseSelectorHook<State>

instantiateStore(store)
