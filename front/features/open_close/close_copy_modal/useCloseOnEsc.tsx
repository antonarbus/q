import { dispatch } from '@lib_instances/store'
import { useEffectOnce } from 'react-use'
import { copySlice } from '@entities/copy'
import { isFroalaSignal, quotationSlice } from '@entities/quotation'

export const useExitCopyOnEsc = (): void => {
  const closeOnEsc = (e: KeyboardEvent): void => {
    if (e.key !== 'Escape') return
    dispatch(copySlice.actions.hideCopyModal())
    dispatch(quotationSlice.actions.removePasteItemReducer())

    setTimeout(() => {
      isFroalaSignal.value = true
    }, 500)
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
