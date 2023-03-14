import { useSelectorTyped } from 'client/store'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'

export function useCursorCords() {
  const initCords = useSelectorTyped(state => state.copy.initCords)
  const [cursorCords, setCursorCords] = useState(initCords)

  function followCursor(e: MouseEvent) {
    setCursorCords({ x: e.x, y: e.y })
  }

  function listenForMousemove() {
    window.addEventListener('mousemove', followCursor)
    return () => { window.removeEventListener('mousemove', followCursor) }
  }

  useEffectOnce(listenForMousemove)
  return cursorCords
}
