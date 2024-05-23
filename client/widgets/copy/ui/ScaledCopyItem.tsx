import { useLayoutEffect, useRef } from 'react'

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
    if (!divRef.current) return
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
