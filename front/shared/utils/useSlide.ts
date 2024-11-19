import { type AnimationScope, useAnimate } from 'motion/react'
import { useRef } from 'react'

type Props = {
  onSlideOutComplete?: () => void
}

type Res = {
  ref: AnimationScope
  slideIn: () => Promise<void>
  slideOut: () => Promise<void>
}

export const useSlide = ({ onSlideOutComplete }: Props): Res => {
  // const [isPresent, safeToRemove] = usePresence()
  const [ref, animate] = useAnimate()
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
    const offsetPosition = screenHeight / 2 + elementHeight / 2

    ref.current.style.translate = `0px ${offsetPosition}px`

    await animate(
      ref.current,
      { y: 0 },
      {
        delay: 0.1,
        duration: 0.2,
        onComplete: () => {
          isAnimationPreventedRef.current = false
          onSlideOutComplete?.()
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
          onSlideOutComplete?.()
        },
      },
    )
  }

  return { ref, slideIn, slideOut }
}
