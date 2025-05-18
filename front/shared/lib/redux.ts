/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { Dispatch, GetState, Store, UseSelector } from '@app/redux'
import { useSelector as useSelectorNotTyped } from 'react-redux'

export type { State as RootState } from '@app/redux'

export let store = null as unknown as Store
export let useSelector = null as unknown as UseSelector
export let dispatch = null as unknown as Dispatch
export let getState = null as unknown as GetState

export const instantiateStore = (instance: Store): void => {
  if (store !== null) {
    throw new Error('store is already instantiated')
  }

  store = instance

  if (useSelector !== null) {
    throw new Error('useSelector is already instantiated')
  }

  useSelector = useSelectorNotTyped as UseSelector

  if (dispatch !== null) {
    throw new Error('dispatch is already instantiated')
  }

  dispatch = store.dispatch

  if (getState !== null) {
    throw new Error('getState is already instantiated')
  }

  getState = store.getState
}
