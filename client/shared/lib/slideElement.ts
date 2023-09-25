import { gsap } from 'gsap'

type Props = {
  element: HTMLElement
  cb?: () => void
  intoView?: boolean
}

let isAnimationPrevented = false // needed to avoid second click on backdrop which launches unwanted second animation

export const slideElement = ({ intoView, element, cb }: Props): void => {
  if (isAnimationPrevented) return
  isAnimationPrevented = true
  const screenHeight = window.window.innerHeight
  const elementHeight = element.offsetHeight
  const offsetPosition = screenHeight / 2 + elementHeight / 2
  gsap.fromTo(
    element,
    {
      y: intoView ? offsetPosition : 0,
      opacity: intoView ? 0 : 1, // to avoid element be shown for a fraction on component load and then sliding in from the bottom
    },
    {
      duration: 0.3,
      y: intoView ? 0 : -offsetPosition,
      opacity: 1,
      onComplete: () => {
        isAnimationPrevented = false
        cb?.()
      },
    },
  )
}
