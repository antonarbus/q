import type { MutableRefObject } from 'react'
import { useEffect, useRef } from 'react'

type Props = {
  froalaElementRef: MutableRefObject<HTMLElement | null>
}

type Res = {
  froalaHeightRef: MutableRefObject<number>
}

export const useFixedHeightForAnimation = ({ froalaElementRef }: Props): Res => {
  const froalaHeightRef = useRef(0)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // timeout is needed, coz froala takes some time to get initiated
      // we need to preserve fixed height during that time to avoid element jumps
      froalaElementRef.current?.style.removeProperty('height')
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  })

  return { froalaHeightRef }
}
