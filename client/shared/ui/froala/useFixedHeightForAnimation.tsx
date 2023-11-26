import type { MutableRefObject } from 'react'
import { useEffect, useRef } from 'react'

type Props = {
  froalaElementRef: MutableRefObject<HTMLElement | null>
}

type Res = {
  heightDuringAnimationRef: MutableRefObject<number>
}

export const useFixedHeightForAnimation = ({ froalaElementRef }: Props): Res => {
  const heightDuringAnimationRef = useRef(0)

  useEffect(() => {
    console.log(666)
    // setHeightBackToAuto
    // timeout is needed, coz froala takes some time to initiate and
    // we need to preserve fixed height during that time, otherwise element jumps
    setTimeout(() => {
      froalaElementRef.current?.style.removeProperty('height')
    }, 500)
  })

  return { heightDuringAnimationRef }
}
