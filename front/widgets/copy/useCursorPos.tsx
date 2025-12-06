import { getState } from '@shared/lib/redux'
import throttle from 'lodash.throttle'
import type { AnimationScope } from 'motion/react'
import { useEffect } from 'react'

type Props = {
  copyModalRef: AnimationScope<HTMLElement | null>
}

export const useCursorPos = (props: Props): void => {
  useEffect(() => {
    const abortController = new AbortController()
    const container = props.copyModalRef.current

    if (container === null) {
      return
    }

    // Initialize position from Redux
    const { initCords } = getState().copy
    container.style.left = `${initCords.x + 30}px`
    container.style.top = `${initCords.y + 30}px`

    const WAIT_MS = 20

    const throttledMouseMove = throttle((event: MouseEvent): void => {
      container.style.left = `${event.x + 30}px`
      container.style.top = `${event.y + 30}px`
    }, WAIT_MS)

    document.addEventListener('mousemove', throttledMouseMove, {
      signal: abortController.signal,
    })

    return (): void => {
      abortController.abort()
    }
  }, [props.copyModalRef])
}
