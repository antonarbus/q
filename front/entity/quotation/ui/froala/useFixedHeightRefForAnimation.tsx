import { type RefObject, useEffect, useRef } from 'react'

type Props = {
  froalaElementRef: RefObject<HTMLElement | null>
}

type Res = RefObject<number>

export const useFixedHeightRefForAnimation = (props: Props): Res => {
  const fixedHeightRef = useRef(0)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // timeout is needed, coz froala takes some time to get initiated
      // we need to preserve fixed height during that time to avoid element jumps
      props.froalaElementRef.current?.style.removeProperty('height')
    }, 500)

    return (): void => {
      clearTimeout(timeoutId)
    }
  })

  return fixedHeightRef
}
