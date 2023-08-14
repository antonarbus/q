import { useLayoutEffect, useRef } from 'react'

interface IProps {
  width: number
  scaleFactor: string
  html: string
}

export const ScaledCopyItem = ({ width, scaleFactor, html }: IProps): JSX.Element => {
  const divRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!divRef.current) return
    divRef.current.innerHTML = html
  }, [])

  return (
    <div
      ref={divRef}
      // className='fr-wrapper fr-element fr-view fr-box'
      css={{
        width,
        transformOrigin: 'left top',
        scale: scaleFactor,
      }}
    />
  )
}
