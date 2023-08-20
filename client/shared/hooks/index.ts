import type { AppDispatch, RootState } from 'client/app/store'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'

export const useDispatchTyped = (): AppDispatch => useDispatch<AppDispatch>()
export const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector

