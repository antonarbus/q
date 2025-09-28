import { useLayoutEffect, useRef } from 'react'
import type { JSX } from 'react'

type Props = {
  width: number
  scaleFactor: string
  html: string
}

export const ScaledCopyItem = ({
  width,
  scaleFactor,
  html,
}: Props): JSX.Element => {
  const divRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (divRef.current === null) {
      return
    }

    divRef.current.innerHTML = html
  }, [])

  return (
    <div
      ref={divRef}
      style={{
        width,
        transformOrigin: 'left top',
        scale: scaleFactor,
      }}
    />
  )
}
