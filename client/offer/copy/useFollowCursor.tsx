import { useEffectOnce } from 'react-use'

export function useFollowCursor() {
  function followCursor(e: MouseEvent) {
    console.log(e.x, e.y)
  }

  function listenForMousemove() {
    window.addEventListener('mousemove', followCursor)
    return () => { window.removeEventListener('mousemove', followCursor) }
  }

  useEffectOnce(listenForMousemove)
}
