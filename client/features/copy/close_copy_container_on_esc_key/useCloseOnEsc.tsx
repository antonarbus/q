import { dispatch } from '@lib_instances/store'
import { useEffectOnce } from 'react-use'
import { copySlice } from '@entities/copy'
import { isItemsFroalaSignal, itemsSlice } from '@entities/items'

export const useExitCopyOnEsc = (): void => {
  const closeOnEsc = (e: KeyboardEvent): void => {
    if (e.key !== 'Escape') return
    dispatch(copySlice.actions.hideCopyContainer())
    dispatch(itemsSlice.actions.removePasteItemReducer())
    setTimeout(() => {
      isItemsFroalaSignal.value = true
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
