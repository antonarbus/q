import { store, theme } from 'client/shared/clients'
import { exitFromCopyMode } from './copySlice'

interface IProps {
  delayed?: boolean
}

export const exitCopyMode = ({ delayed = false } = {}): void => {
  const delay = delayed ? 1000 * theme.item.animationDuration + 500 : 0

  setTimeout(() => {
    store.dispatch(exitFromCopyMode())
  }, delay)
}