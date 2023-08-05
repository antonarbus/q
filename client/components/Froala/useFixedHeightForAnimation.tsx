import type { RefDiv } from 'client/types'
import type { MutableRefObject } from 'react';
import { useEffect, useRef } from 'react'

interface IProps {
  froalaElementRef: RefDiv
}

interface IReturn {
  heightDuringAnimationRef: MutableRefObject<number>
}

export const useFixedHeightForAnimation = ({ froalaElementRef }: IProps): IReturn => {
  const heightDuringAnimationRef = useRef<number>(0)

  useEffect(function setHeightBackToAuto() {
    // timeout is needed, coz froala takes some time to initiate and
    // we need to preserve fixed height during that time, otherwise element jumps
    setTimeout(() => {
      froalaElementRef.current.style.removeProperty('height')
    }, 500)
  })

  return { heightDuringAnimationRef }
};
