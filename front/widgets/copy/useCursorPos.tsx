import { getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import throttle from 'lodash.throttle'
import { useEffect, useRef, useState } from 'react'

type Res = {
  x: number
  y: number
}

export const useCursorPos = (): Res => {
  const [cursorPos, setCursorPos] = useState({
    x: getState().copy.initCords.x,
    y: getState().copy.initCords.y,
  })

  const isAnimatingRef = useRef(false)
  const items = useSelector((state) => state.copy.items)

  // Track when animations start/end
  useEffect(() => {
    isAnimatingRef.current = true

    const timeoutId = setTimeout(() => {
      isAnimatingRef.current = false
    }, theme.copy.animationDuration * 1000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [items.length])

  useEffect(() => {
    const abortController = new AbortController()

    const WAIT_MS = 20

    const throttledMouseMove = throttle((event: MouseEvent): void => {
      // Skip updates during animation
      if (isAnimatingRef.current === true) {
        return
      }

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
