import { useDispatchTyped } from 'client/store'
import { useEffectOnce } from 'react-use'
import { hideCopyContainer } from './copySlice'
import { theme } from 'client/theme'

export function useCloseOnEsc() {
  const dispatch = useDispatchTyped()

  function closeOnEsc(e: KeyboardEvent) {
    if (e.key !== 'Escape') return
    // todo: close copy container immediately
    // todo: but copyMode to be false with delay
    setTimeout(() => {
      dispatch(hideCopyContainer())
    }, 1000 * theme.item.animationDuration)
  }

  function listenForEsc() {
    window.addEventListener('keydown', closeOnEsc)
    return () => window.removeEventListener('keydown', closeOnEsc)
  }

  useEffectOnce(listenForEsc)
}
