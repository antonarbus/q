import { store, theme } from 'client/shared/clients'
import { exitFromCopyMode } from './copySlice'

export const exitCopyMode = ({ delayed = false } = {}): void => {
  const animationDurationAndBitMore = 1000 * theme.item.animationDuration + 500
  const delay = delayed ? animationDurationAndBitMore : 0

  setTimeout(() => {
    store.dispatch(exitFromCopyMode())
  }, delay)
}