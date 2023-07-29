import { AppDispatch, RootState } from 'client/app/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector
export const useDispatchTyped = () => useDispatch<AppDispatch>()