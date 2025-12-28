import { type JSX, useLayoutEffect, useRef } from 'react'

type Props = {
  width: number
  scaleFactor: string
  html: string
}

export const ScaledCopyItem = (props: Props): JSX.Element => {
  const divRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (divRef.current === null) {
      return
    }

    divRef.current.innerHTML = props.html
  }, [])

  return (
    <div
      ref={divRef}
      style={{
        width: props.width,
        transformOrigin: 'left top',
        scale: props.scaleFactor,
      }}
    />
  )
}
