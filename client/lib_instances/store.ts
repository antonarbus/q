import { type Action, type ThunkAction, configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { copyReducer } from '@entities/copy/copySlice'
import { itemsReducer } from '@entities/items/redux/itemsSlice'
import { navReducer } from '@entities/nav/navSlice'
import { userReducer } from '@entities/user/redux/userSlice'
import { generalReducer } from '@shared/general/generalSlice'

const store = configureStore({
  reducer: {
    general: generalReducer,
    user: userReducer,
    nav: navReducer,
    items: itemsReducer,
    copy: copyReducer,
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
