import { useEffectOnce } from 'react-use'

export const usePasteCords = () => {
  function followCursor(e: MouseEvent) {
    console.log({ x: e.x, y: e.y })
  }

  function listenForMousemove() {
    window.addEventListener('mousemove', followCursor)
    return () => { window.removeEventListener('mousemove', followCursor) }
  }

  useEffectOnce(listenForMousemove)
}
