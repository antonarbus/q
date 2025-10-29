import { getState } from '@shared/lib/redux'
import throttle from 'lodash.throttle'
import type { AnimationScope } from 'motion/react'
import { useEffect } from 'react'

type Props = {
  copyModalRef: AnimationScope
}

export const useCursorPos = (props: Props): void => {
  useEffect(() => {
    const abortController = new AbortController()
    const container = props.copyModalRef.current

    if (container === null) {
      return
    }

    // Initialize position from Redux
    const initCords = getState().copy.initCords
    container.style.setProperty('--cursor-x', `${initCords.x}px`)
    container.style.setProperty('--cursor-y', `${initCords.y}px`)

    const WAIT_MS = 20

    const throttledMouseMove = throttle((event: MouseEvent): void => {
      // Update CSS variables directly - no React re-render!
      if (props.copyModalRef.current !== null) {
        props.copyModalRef.current.style.setProperty(
          '--cursor-x',
          `${event.x}px`,
        )

        props.copyModalRef.current.style.setProperty(
          '--cursor-y',
          `${event.y}px`,
        )
      }
    }, WAIT_MS)

    document.addEventListener('mousemove', throttledMouseMove, {
      signal: abortController.signal,
    })

    return () => {
      abortController.abort()
    }
  }, [props.copyModalRef])
}
