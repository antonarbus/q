import { type Action, type ThunkAction, configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { copySlice } from '@entities/copy'
import { itemsSlice } from '@entities/items'
import { navSlice } from '@entities/nav'
import { spinnerSlice } from '@entities/spinner'
import { userSlice } from '@entities/user'
import { generalSlice } from '@shared/general'

const store = configureStore({
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

const getState = store.getState
const dispatch = store.dispatch

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

const useDispatchTyped = (): AppDispatch => useDispatch<AppDispatch>()
const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector

export { store, getState, dispatch, useDispatchTyped, useSelectorTyped, type RootState, type AppDispatch, type AppThunk }
