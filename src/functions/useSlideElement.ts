import { gsap } from 'gsap'

type Props = {
  element: HTMLElement
  cb?: () => void
  intoView: boolean
}

let isAnimationPrevented = false // needed to avoid second click on backdrop which launches unwanted second animation

/**
 * @param props object with parameters
 * @param props.element reference to an element
 * @param props.cb callback triggered after animation is ended, for ex. link navigation or component render state change
 * @param props.intoView when true, element slides from the bottom into the view, if false, it slides up out of the view
 */

export function useSlideElement({ intoView, element, cb }: Props) {
  if (isAnimationPrevented) return
  isAnimationPrevented = true
  const screenHeight = window.window.innerHeight
  const elementHeight = element.offsetHeight
  const offsetPosition = screenHeight / 2 + elementHeight / 2
  gsap.fromTo(
    element,
    {
      y: intoView ? offsetPosition : 0
    },
    {
      duration: 0.3,
      y: intoView ? 0 : -offsetPosition,
      onComplete: () => {
        isAnimationPrevented = false
        cb?.()
      }
    }
  )
}
