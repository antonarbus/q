import type { SxProps } from '@mui/material'
import type { MutableRefObject } from 'react'
import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useEffectOnce } from 'react-use'

type Props = {
  padding?: number | string
  htmlGetter: () => string
  additionalStyle?: SxProps
  heightDuringAnimationRef: MutableRefObject<number | undefined>
}

export const StaticHtml = ({
  htmlGetter,
  padding,
  additionalStyle,
  heightDuringAnimationRef,
}: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement>()

  useEffectOnce(() => {
    // insert html into element
    if (!ref.current) return
    ref.current.innerHTML = htmlGetter()
  })

  useEffect(() => {
    // save height after loading content
    if (!ref.current?.clientHeight) return
    heightDuringAnimationRef.current = ref.current.clientHeight
  })

  return (
    <Box
      ref={ref}
      className='static-html'
      style={{
        padding: padding ?? 0,
      }}
      sx={{
        opacity: 0.5,
        wordBreak: 'break-word',
        '& .fr-element:hover:not(:focus)': {
          // textShadow: '0px 0px 0.8px',
        },
        ...additionalStyle,
      }}
    ></Box>
  )
}
