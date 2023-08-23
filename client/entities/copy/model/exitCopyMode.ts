import { dispatch, theme } from 'client/shared/clients'
import { copySlice } from './copySlice'

const animationDurationAndBitMore = 1000 * theme.item.animationDuration + 500

export const exitCopyMode = ({
  delayed = false,
  delayMs = animationDurationAndBitMore,
} = {}): void => {
  const delay = delayed ? delayMs : 0

  setTimeout(() => {
    dispatch(copySlice.actions.exitFromCopyMode())
  }, delay)
}
