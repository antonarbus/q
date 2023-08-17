import type { AppDispatch, RootState } from 'client/app/store'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'

export const useDispatchTyped = (): TDispatch => useDispatch<TDispatch>()
export const useSelectorTyped: TypedUseSelectorHook<TState> = useSelector

