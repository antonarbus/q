import { useSelectorTyped } from 'client/shared/hooks'
import type { MutableRefObject } from 'react'
import { useEffect, useRef } from 'react'

type Props = {
  froalaElementRef: MutableRefObject<HTMLElement | null>
}

type Res = {
  heightDuringAnimationRef: MutableRefObject<number>
}

export const useFixedHeightForAnimation = ({ froalaElementRef }: Props): Res => {
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)
  const heightDuringAnimationRef = useRef(0)

  useEffect(() => {
    // timeout is needed, coz froala takes some time to initiate and
    // we need to preserve fixed height during that time, otherwise element jumps
    setTimeout(() => {
      froalaElementRef.current?.style.removeProperty('height')
    }, 500)
  }, [isCopyMode])

  return { heightDuringAnimationRef }
}
