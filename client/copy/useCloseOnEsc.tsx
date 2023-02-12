import { removePasteText } from 'client/offer/offerSlice'
import { useDispatchTyped } from 'client/store'
import { useEffectOnce } from 'react-use'
import { hideCopyContainer } from './copySlice'

export function useCloseOnEsc() {
  const dispatch = useDispatchTyped()

  function closeOnEsc(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      dispatch(hideCopyContainer())
      dispatch(removePasteText())
    }
  }

  function listenForEsc() {
    window.addEventListener('keydown', closeOnEsc)
    return () => window.removeEventListener('keydown', closeOnEsc)
  }

  useEffectOnce(listenForEsc)
}
