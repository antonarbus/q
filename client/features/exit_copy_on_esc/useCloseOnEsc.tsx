import { exitCopyMode, hideCopyContainer } from 'client/entities/copy'
import { removePasteItem } from 'client/entities/items'
import { useDispatchTyped } from 'client/shared/hooks'
import { useEffectOnce } from 'react-use'

export const useExitCopyOnEsc = (): void => {
  const dispatch = useDispatchTyped()

  const closeOnEsc = (e: KeyboardEvent): void => {
    if (e.key !== 'Escape') return
    dispatch(hideCopyContainer())
    dispatch(removePasteItem())
    exitCopyMode()
  }

  type FuncReturn = () => void

  const listenForEsc = (): FuncReturn => {
    window.addEventListener('keydown', closeOnEsc)
    return (): void => {
      window.removeEventListener('keydown', closeOnEsc)
    }
  }

  useEffectOnce(listenForEsc)
}
