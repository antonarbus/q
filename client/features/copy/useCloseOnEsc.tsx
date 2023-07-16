import { useDispatchTyped } from 'client/store'
import { useEffectOnce } from 'react-use'
import { exitFromCopyMode, hideCopyContainer } from './copySlice'

export function useCloseOnEsc() {
  const dispatch = useDispatchTyped()

  function closeOnEsc(e: KeyboardEvent) {
    if (e.key !== 'Escape') return
    dispatch(hideCopyContainer())
    setTimeout(() => {
      dispatch(exitFromCopyMode())
    }, 500)
  }

  function listenForEsc() {
    window.addEventListener('keydown', closeOnEsc)
    return () => window.removeEventListener('keydown', closeOnEsc)
  }

  useEffectOnce(listenForEsc)
}
