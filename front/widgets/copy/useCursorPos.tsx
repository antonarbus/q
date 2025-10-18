import { getState } from '@shared/lib/redux'
import throttle from 'lodash.throttle'
import { useEffect, useState } from 'react'

type Res = {
  x: number
  y: number
}

export const useCursorPos = (): Res => {
  const [cursorPos, setCursorPos] = useState({
    x: getState().copy.initCords.x,
    y: getState().copy.initCords.y,
  })

  useEffect(() => {
    const abortController = new AbortController()

    const WAIT_MS = 20

    const throttledMouseMove = throttle((event: MouseEvent): void => {
      setCursorPos({ x: event.x, y: event.y })
    }, WAIT_MS)

    document.addEventListener('mousemove', throttledMouseMove, {
      signal: abortController.signal,
    })

    return () => {
      abortController.abort()
    }
  }, [])

  return cursorPos
}
