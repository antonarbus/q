import { gsap } from 'gsap'

type Props = {
  element: HTMLElement | null
  onSlideElementComplete?: () => void
  intoView?: boolean
}

let isAnimationPrevented = false // needed to avoid second click on backdrop which launches unwanted second animation

export const slideElement = ({ intoView, element, onSlideElementComplete }: Props): void => {
  if (isAnimationPrevented) return
  if (element === null) return

  isAnimationPrevented = true
  const screenHeight = window.window.innerHeight
  const elementHeight = element.offsetHeight
  const offsetPosition = screenHeight / 2 + elementHeight / 2

  gsap.fromTo(
    element,
    {
      y: intoView ? offsetPosition : 0,
    },
    {
      delay: 0.2,
      duration: 0.3,
      y: intoView ? 0 : -offsetPosition,
      onComplete: () => {
        isAnimationPrevented = false
        onSlideElementComplete?.()
      },
    },
  )
}
