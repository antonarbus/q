import { copyReducer } from '@entities/copy/copySlice'
import { navReducer } from '@entities/nav/navSlice'
import { quotationReducer } from '@entities/quotation/redux/quotationSlice'
import { userReducer } from '@entities/user/redux/userSlice'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from '@shared/appSlice'
import { agGridReducer } from '@shared/lib/ag-grid/agGridSlice'
import { textReducer } from '@shared/lib/froala/textSlice'
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
  devTools: process.env.NODE_ENV !== 'production',
})

export type Store = typeof store
export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export type GetState = typeof store.getState
export type UseSelector = TypedUseSelectorHook<State>

instantiateStore(store)
