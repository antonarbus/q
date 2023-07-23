import { RefDiv } from 'client/types'
import { useEffect, useRef } from 'react'

type Props = {
  froalaElementRef: RefDiv
}

export function useFixedHeightForAnimation({ froalaElementRef }: Props) {
  const heightDuringAnimationRef = useRef<number>()

  useEffect(function setHeightBackToAuto() {
    // timeout is needed, coz froala takes some time to initiate and
    // we need to preserve fixed height during that time, otherwise element jumps
    setTimeout(() => {
      froalaElementRef.current?.style?.removeProperty('height')
    }, 500)
  })

  return { heightDuringAnimationRef }
}
