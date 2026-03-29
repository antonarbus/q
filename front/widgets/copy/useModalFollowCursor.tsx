import { reduxHolder } from '@front/shared/lib/redux'
import throttle from 'lodash.throttle'
import type { AnimationScope } from 'motion/react'
import { useEffect } from 'react'

type Props = {
  copyModalRef: AnimationScope<HTMLElement | null>
}

export const useModalFollowCursor = (props: Props): void => {
  useEffect(() => {
    const abortController = new AbortController()
    const container = props.copyModalRef.current

    if (container === null) {
      return
    }

    const state = reduxHolder.getState()

    // Initialize position from Redux
    if (state.copy.initCursorPos !== null) {
      container.style.left = `${state.copy.initCursorPos.x + 30}px`
      container.style.top = `${state.copy.initCursorPos.y + 30}px`
    }

    const WAIT_MS = 20

    const throttledMouseMove = throttle((event: MouseEvent): void => {
      // '30px', //  <-- update on cursor move
      container.style.left = `${event.x + 30}px`
      // '30px', // <-- update on cursor move
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
