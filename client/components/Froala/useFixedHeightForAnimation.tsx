import { TRefDiv } from 'client/types'
import { useEffect, useRef } from 'react'

type TProps = {
  froalaElementRef: TRefDiv
  isCopyMode: boolean
}

export function useFixedHeightForAnimation({ froalaElementRef, isCopyMode }: TProps) {
  const heightDuringAnimationRef = useRef<number>()

  useEffect(function setHeightBackToAuto() {
    // timeout is needed, coz froala takes some time to initiate and
    // we need to preserve fixed height during that time, otherwise element jumps
    setTimeout(() => {
      froalaElementRef.current?.style?.removeProperty('height')
    }, 500)
  }, [isCopyMode])

  return { heightDuringAnimationRef }
}
