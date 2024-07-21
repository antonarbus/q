import { type Action, type ThunkAction, configureStore } from '@reduxjs/toolkit'
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'
import { copyReducer } from '@entities/copy/copySlice'
import { quotationReducer } from '@entities/quotation/redux/quotationSlice'
import { userReducer } from '@entities/user/redux/userSlice'
import { navReducer } from '@shared/nav/navSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    nav: navReducer,
    quotation: quotationReducer,
    copy: copyReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({ serializableCheck: false }), // we have not serializable components and functions in nav structure
  devTools: process.env.NODE_ENV !== 'production',
})

// eslint-disable-next-line @typescript-eslint/unbound-method
const getState = store.getState
const dispatch = store.dispatch

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>

const useDispatchTyped = (): AppDispatch => useDispatch<AppDispatch>()
const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector

export {
  store,
  getState,
  dispatch,
  useDispatchTyped,
  useSelectorTyped,
  type RootState,
  type AppDispatch,
  type AppThunk,
}
