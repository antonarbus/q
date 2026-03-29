import type { Register } from './register'
import { useSelector as useSelectorNotTyped, type TypedUseSelectorHook } from 'react-redux'

export type RootState = Register extends { state: infer S } ? S : never
type AppDispatch = Register extends { dispatch: infer D } ? D : never
type Store = Register extends { store: infer ST } ? ST : never
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
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return this.store.getState as () => RootState
  }
}

export const reduxHolder = new ReduxHolder()
