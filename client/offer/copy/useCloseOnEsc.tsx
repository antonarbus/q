import { useDispatchTyped } from 'client/store'
import { useEffectOnce } from 'react-use'

export function useCloseOnEsc() {
  const dispatch = useDispatchTyped()

  function closeOnEsc(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      alert('close copy container')
    }
  }

  function listenForEsc() {
    window.addEventListener('keydown', closeOnEsc)
    return () => { window.removeEventListener('keydown', closeOnEsc) }
  }

  useEffectOnce(listenForEsc)
}
