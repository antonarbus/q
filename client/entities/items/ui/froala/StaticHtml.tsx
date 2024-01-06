import type { SxProps } from '@mui/material'
import type { MutableRefObject } from 'react'
import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useEffectOnce } from 'react-use'

type Props = {
  htmlGetter: () => string
  additionalStyle?: SxProps
  froalaHeightRef: MutableRefObject<number | undefined>
}

export const StaticHtml = ({
  htmlGetter,
  additionalStyle,
  froalaHeightRef,
}: Props): JSX.Element => {
  const staticHtmlRef = useRef<HTMLDivElement>()

  useEffectOnce(() => {
    // insert html into element
    if (!staticHtmlRef.current) return
    staticHtmlRef.current.innerHTML = htmlGetter()
  })

  useEffect(() => {
    // save height after loading content
    if (!staticHtmlRef.current?.clientHeight) return
    froalaHeightRef.current = staticHtmlRef.current.clientHeight
  })

  return (
    <Box
      ref={staticHtmlRef}
      className='static-html'
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
