import { copyReducer } from '@entity/copy/copySlice'
import { navReducer } from '@entity/nav/navSlice'
import { quotationReducer } from '@entity/quotation/redux/quotationSlice'
import { userReducer } from '@entity/user/redux/userSlice'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from '@shared/appSlice'
import { agGridReducer } from '@shared/lib/ag-grid/agGridSlice'
import { textReducer } from '@shared/lib/tiptap/store/textSlice'
import { instantiateStore } from '@shared/lib/redux/redux'
import type { TypedUseSelectorHook } from 'react-redux'

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    nav: navReducer,
    quotation: quotationReducer,
    copy: copyReducer,
    agGrid: agGridReducer,
    text: textReducer,
  },
  // Vite's magic, browser does not have 'process' variable,
  // Vite replaces process.env.NODE_ENV with the actual string value at build time
  // This only works for process.env.NODE_ENV specifically. Other process.env.* variables
  // import.meta.env.MODE !== 'production' (Vite-idiomatic way and makes it clearer that it's a build-time constant. )
  devTools: process.env.NODE_ENV !== 'production',
})

export type Store = typeof store
export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export type GetState = typeof store.getState
export type UseSelector = TypedUseSelectorHook<State>

instantiateStore(store)
