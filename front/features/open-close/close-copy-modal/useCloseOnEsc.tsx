import { copySlice } from '@front/entities/copy/copySlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useEffectOnce } from 'react-use'

export const useExitCopyOnEsc = (): void => {
  const closeOnEsc = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape') {
      return
    }

    reduxHolder.dispatch(copySlice.actions.hideCopyModal())
  }

  type Res = () => void

  const listenForEsc = (): Res => {
    globalThis.addEventListener('keydown', closeOnEsc)

    // Cleanup
    return (): void => {
      globalThis.removeEventListener('keydown', closeOnEsc)
    }
  }

  useEffectOnce(listenForEsc)
}
