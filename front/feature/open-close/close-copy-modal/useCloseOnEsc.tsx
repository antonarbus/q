import { copySlice } from '@entity/copy/copySlice'
import { dispatch } from '@shared/lib/redux'
import { useEffectOnce } from 'react-use'

export const useExitCopyOnEsc = (): void => {
  const closeOnEsc = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape') {
      return
    }

    dispatch(copySlice.actions.hideCopyModal())
  }

  type Res = () => void

  const listenForEsc = (): Res => {
    window.addEventListener('keydown', closeOnEsc)

    // cleanup
    return (): void => {
      window.removeEventListener('keydown', closeOnEsc)
    }
  }

  useEffectOnce(listenForEsc)
}
