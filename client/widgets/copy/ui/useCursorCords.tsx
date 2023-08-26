import { useSelectorTyped } from 'client/shared/hooks'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'

interface Props {
  x: number;
  y: number;
}

export const useCursorCords = (): Props => {
  const initCords = useSelectorTyped(state => state.copy.initCords)
  const [cursorCords, setCursorCords] = useState(initCords)

  const followCursor = (e: MouseEvent): void => {
    setCursorCords({ x: e.x, y: e.y })
  }

  type FuncReturnType = () => void

  const listenForMousemove = (): FuncReturnType => {
    window.addEventListener('mousemove', followCursor)
    return () => {
      window.removeEventListener('mousemove', followCursor)
    }
  }

  useEffectOnce(listenForMousemove)

  return cursorCords
}
