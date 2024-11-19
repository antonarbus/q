import { type AnimationScope, useAnimate } from 'motion/react'
import { useRef } from 'react'

type Res = {
  ref: AnimationScope
  slideIn: () => Promise<void>
  slideOut: () => Promise<void>
}

export const useSlide = (): Res => {
  const [ref, animate] = useAnimate<HTMLElement>()
  const isAnimationPreventedRef = useRef(false)

  const slideIn = async (): Promise<void> => {
    if (!(ref.current instanceof HTMLElement)) {
      return
    }

    if (isAnimationPreventedRef.current) {
      return
    }

    isAnimationPreventedRef.current = true

    const screenHeight = window.window.innerHeight
    const elementHeight = ref.current.offsetHeight
    const moreDistanceToMoveAwayCloseButton = 100

    const offsetPosition =
      screenHeight / 2 + elementHeight / 2 + moreDistanceToMoveAwayCloseButton

    ref.current.style.transform = `translateY(${offsetPosition}px)`

    await animate(
      ref.current,
      { y: [offsetPosition, 0] },
      {
        delay: 0.1,
        duration: 0.2,
        onComplete: () => {
          isAnimationPreventedRef.current = false
        },
      },
    )
  }

  const slideOut = async (): Promise<void> => {
    if (!(ref.current instanceof HTMLElement)) {
      return
    }

    if (isAnimationPreventedRef.current) {
      return
    }

    isAnimationPreventedRef.current = true

    const screenHeight = window.window.innerHeight
    const elementHeight = ref.current.offsetHeight
    const offsetPosition = screenHeight / 2 + elementHeight / 2

    await animate(
      ref.current,
      { y: -offsetPosition },
      {
        delay: 0.1,
        duration: 0.2,
        onComplete: () => {
          isAnimationPreventedRef.current = false
        },
      },
    )
  }

  return { ref, slideIn, slideOut }
}
