import { useSelectorTyped } from 'client/shared/hooks'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'

interface IProps {
  x: number;
  y: number;
}

export const useCursorCords = (): IProps => {
  const initCords = useSelectorTyped((state) => state.copy.initCords)
  const [cursorCords, setCursorCords] = useState(initCords)

  const followCursor = (e: MouseEvent): void => {
    setCursorCords({ x: e.x, y: e.y })
  }

  type TReturn = () => void

  const listenForMousemove = (): TReturn => {
    window.addEventListener('mousemove', followCursor)
    return () => {
      window.removeEventListener('mousemove', followCursor)
    }
  }

  useEffectOnce(listenForMousemove)

  return cursorCords
}
