import { copySlice, exitCopyMode } from 'client/entities/copy'
import { itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { useEffectOnce } from 'react-use'

export const useExitCopyOnEsc = (): void => {
  const closeOnEsc = (e: KeyboardEvent): void => {
    if (e.key !== 'Escape') return
    dispatch(copySlice.actions.hideCopyContainer())
    dispatch(itemsSlice.actions.removePasteItem())
    exitCopyMode()
  }

  type FuncReturnType = () => void

  const listenForEsc = (): FuncReturnType => {
    window.addEventListener('keydown', closeOnEsc)
    return (): void => {
      window.removeEventListener('keydown', closeOnEsc)
    }
  }

  useEffectOnce(listenForEsc)
}
