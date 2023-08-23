import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../types'

export const useDispatchTyped = (): AppDispatch => useDispatch<AppDispatch>()
export const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector

