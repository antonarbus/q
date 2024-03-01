import { dispatch } from '@lib_instances/store'
import { useEffectOnce } from 'react-use'
import { copySlice } from '@entities/copy'
import { itemsSlice } from '@entities/items'
import { generalSlice } from '@shared/general'

export const useExitCopyOnEsc = (): void => {
  const closeOnEsc = (e: KeyboardEvent): void => {
    if (e.key !== 'Escape') return
    dispatch(copySlice.actions.hideCopyContainer())
    dispatch(itemsSlice.actions.removePasteItemReducer())
    dispatch(generalSlice.actions.enableFroala())
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
