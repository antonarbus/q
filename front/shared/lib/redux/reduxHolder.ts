import type { Register } from './register'
import { useSelector as useSelectorNotTyped } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

export type RootState = Register extends { state: infer StateType } ? StateType : never

type AppDispatch = Register extends { dispatch: infer DispatchFunction } ? DispatchFunction : never
type Store = Register extends { store: infer StoreType } ? StoreType : never
type UseSelector = TypedUseSelectorHook<RootState>

class ReduxHolder {
  #store: Store | null = null

  public readonly useSelector: UseSelector = useSelectorNotTyped as UseSelector

  public set store(instance: Store) {
    if (this.#store !== null) {
      throw new Error('store is already instantiated')
    }

    this.#store = instance
  }

  public get store(): Store {
    if (this.#store === null) {
      throw new Error('store is not initialized')
    }

    return this.#store
  }

  public get dispatch(): AppDispatch {
    return this.store.dispatch
  }

  public get getState(): () => RootState {
    return (): RootState => this.store.getState()
  }
}

export const reduxHolder = new ReduxHolder()
