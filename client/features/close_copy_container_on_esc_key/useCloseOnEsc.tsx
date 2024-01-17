import { useEffectOnce } from 'react-use'
import { appSlice } from '@entities/app'
import { copySlice } from '@entities/copy'
import { itemsSlice } from '@entities/items'
import { dispatch } from '@shared/clients'

export const useExitCopyOnEsc = (): void => {
  const closeOnEsc = (e: KeyboardEvent): void => {
    if (e.key !== 'Escape') return
    dispatch(copySlice.actions.hideCopyContainer())
    dispatch(itemsSlice.actions.removePasteItemReducer())
    dispatch(appSlice.actions.enableFroala())
  }

  type Res = () => void

  const listenForEsc = (): Res => {
    window.addEventListener('keydown', closeOnEsc)
    return (): void => {
      window.removeEventListener('keydown', closeOnEsc)
    }
  }

  useEffectOnce(listenForEsc)
}
