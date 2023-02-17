import { useDispatchTyped } from 'client/store'
import { useEffectOnce } from 'react-use'
import { hideCopyContainer, updatePastePos } from './copySlice'

export function useCloseOnEsc() {
  const dispatch = useDispatchTyped()

  function closeOnEsc(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      dispatch(updatePastePos({ pastePos: 'nowhere', itemId: 'some id' }))
      dispatch(hideCopyContainer())
    }
  }

  function listenForEsc() {
    window.addEventListener('keydown', closeOnEsc)
    return () => window.removeEventListener('keydown', closeOnEsc)
  }

  useEffectOnce(listenForEsc)
}
