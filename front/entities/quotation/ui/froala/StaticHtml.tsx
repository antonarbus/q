import { Box } from '@mui/material'
import {
  type CSSProperties,
  useEffect,
  useRef,
  type JSX,
  type ComponentRef,
} from 'react'
import { useEffectOnce } from 'react-use'
import { useFroala } from '../../provider/FroalaProvider'

type Props = {
  styleAgainstFroalaBlinks?: CSSProperties
}

export const StaticHtml = ({
  styleAgainstFroalaBlinks,
}: Props): JSX.Element => {
  const staticHtmlRef = useRef<ComponentRef<'div'>>(null)
  const { htmlGetter, style, froalaHeightRef, sx } = useFroala()

  // insert html into element
  useEffectOnce(() => {
    if (staticHtmlRef.current === null) {
      return
    }

    staticHtmlRef.current.innerHTML = htmlGetter()
  })

  // save height after loading content
  useEffect(() => {
    if (staticHtmlRef.current?.clientHeight === undefined) {
      return
    }

    froalaHeightRef.current =
      staticHtmlRef.current.getBoundingClientRect().height
  })

  return (
    <Box className='static-html fr-box fr-inline'>
      <Box className='fr-wrapper'>
        <Box
          className='fr-element fr-view'
          ref={staticHtmlRef}
          style={{
            opacity: 0.5,
            wordBreak: 'break-word',
            ...styleAgainstFroalaBlinks,
            ...style,
          }}
          sx={sx}
        />
      </Box>
    </Box>
  )
}
