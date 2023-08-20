import type { MutableRefObject } from 'react'
import { useEffect, useRef } from 'react'

interface Props {
  froalaElementRef: MutableRefObject<HTMLElement | null>
}

interface ReturnFunc {
  heightDuringAnimationRef: MutableRefObject<number>
}

export const useFixedHeightForAnimation = ({ froalaElementRef }: Props): ReturnFunc => {
  const heightDuringAnimationRef = useRef<number>(0)

  useEffect(() => {
    // setHeightBackToAuto
    // timeout is needed, coz froala takes some time to initiate and
    // we need to preserve fixed height during that time, otherwise element jumps
    setTimeout(() => {
      froalaElementRef.current?.style.removeProperty('height')
    }, 500)
  })

  return { heightDuringAnimationRef }
}
