import { useState } from 'react'
import { useEffectOnce } from 'react-use'

export function useCursorCords() {
  const [cursorCords, setCursorCords] = useState({ x: 0, y: 0 })

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
