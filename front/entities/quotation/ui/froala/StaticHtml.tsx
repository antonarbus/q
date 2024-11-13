import { Box } from '@mui/material'
import { type CSSProperties, useEffect, useRef } from 'react'
import { useEffectOnce } from 'react-use'
import { useFroala } from '../../providers/FroalaProvider'

type Props = {
  styleAgainstFroalaBlinks?: CSSProperties
}

export const StaticHtml = ({
  styleAgainstFroalaBlinks,
}: Props): React.JSX.Element => {
  const staticHtmlRef = useRef<HTMLDivElement>()
  const { htmlGetter, style, froalaHeightRef, sx } = useFroala()

  // insert html into element
  useEffectOnce(() => {
    if (!staticHtmlRef.current) {
      return
    }

    staticHtmlRef.current.innerHTML = htmlGetter()
  })

  // save height after loading content
  useEffect(() => {
    if (!staticHtmlRef.current?.clientHeight) {
      return
    }

    froalaHeightRef.current =
      staticHtmlRef.current.getBoundingClientRect().height
  })

  return (
    <Box className='static-html fr-box fr-inline'>
      <Box className='fr-wrapper'>
        <Box
          ref={staticHtmlRef}
          className='fr-element fr-view'
          sx={sx}
          style={{
            opacity: 0.5,
            wordBreak: 'break-word',
            ...styleAgainstFroalaBlinks,
            ...style,
          }}
        ></Box>
      </Box>
    </Box>
  )
}
