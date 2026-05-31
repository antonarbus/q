import { useLayoutEffect, useRef, useCallback } from 'react'

type Props = {
  width: number
  scaleFactor: string
  html: string
  onHeightChange?: (height: number) => void
}

export const ScaledClipboardItem = (props: Props): React.JSX.Element => {
  const divRef = useRef<HTMLDivElement>(null)

  const reportHeight = useCallback(() => {
    if (divRef.current !== null) {
      props.onHeightChange?.(divRef.current.offsetHeight)
    }
  }, [props.onHeightChange])

  useLayoutEffect(() => {
    if (divRef.current === null) {
      return
    }

    divRef.current.innerHTML = props.html

    const imgs = [...divRef.current.querySelectorAll('img')]

    if (imgs.length === 0) {
      reportHeight()
      return
    }

    let pending = imgs.length

    const onLoad = (): void => {
      pending = pending - 1

      if (pending === 0) {
        reportHeight()
      }
    }

    imgs.forEach((img) => {
      if (img.complete) {
        onLoad()
      } else {
        img.addEventListener('load', onLoad, { once: true })
        img.addEventListener('error', onLoad, { once: true })
      }
    })
  }, [props.html, reportHeight])

  return (
    <div
      ref={divRef}
      style={{
        width: props.width,
        transformOrigin: 'left top',
        scale: props.scaleFactor,
        background: 'white',
        position: 'relative',
      }}
    />
  )
}
