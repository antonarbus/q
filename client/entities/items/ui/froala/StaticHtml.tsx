import { Box } from '@mui/material'
import { type CSSProperties, useEffect, useRef } from 'react'
import { useEffectOnce } from 'react-use'
import { useFroala } from '../../providers/FroalaProvider'

type Props = {
  additionalStyles2?: CSSProperties
}

export const StaticHtml = ({ additionalStyles2 }: Props): JSX.Element => {
  const staticHtmlRef = useRef<HTMLDivElement>()
  const { htmlGetter, additionalStyle, froalaHeightRef } = useFroala()

  // insert html into element
  useEffectOnce(() => {
    if (!staticHtmlRef.current) return
    staticHtmlRef.current.innerHTML = htmlGetter()
  })

  // save height after loading content
  useEffect(() => {
    if (!staticHtmlRef.current?.clientHeight) return
    froalaHeightRef.current = staticHtmlRef.current.clientHeight
  })

  return (
    <Box
      className='static-html fr-box fr-inline'
    >
      <Box
        className='fr-wrapper'
      >
        <Box
          ref={staticHtmlRef}
          className='fr-element fr-view'
          sx={{
            opacity: 0.5,
            wordBreak: 'break-word',
            ...additionalStyle,
          }}
          style={additionalStyles2}
        >
        </Box>
      </Box>
    </Box>
  )
}
