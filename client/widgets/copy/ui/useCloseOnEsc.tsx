import { exitFromCopyMode, hideCopyContainer } from 'client/entities/copy'
import { removePasteItem } from 'client/entities/items'
import { useDispatchTyped } from 'client/shared/hooks'
import { useEffectOnce } from 'react-use'

export function useCloseOnEsc() {
  const dispatch = useDispatchTyped()

  function closeOnEsc(e: KeyboardEvent) {
    if (e.key !== 'Escape') return
    dispatch(hideCopyContainer())
    dispatch(removePasteItem())
    setTimeout(() => {
      dispatch(exitFromCopyMode())
    }, 500)
  }

  function listenForEsc() {
    window.addEventListener('keydown', closeOnEsc)
    return () => {
      window.removeEventListener('keydown', closeOnEsc)
    }
  }

  useEffectOnce(listenForEsc)
}
