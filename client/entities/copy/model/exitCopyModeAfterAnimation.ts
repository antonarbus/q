import { store, theme } from 'client/shared/clients'
import { exitFromCopyMode } from './copySlice'

export const exitCopyModeAfterAnimation = (): void => {
  setTimeout(() => {
    store.dispatch(exitFromCopyMode())
  }, 1000 * theme.item.animationDuration + 500)
}