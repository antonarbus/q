import { Box } from '@mui/material'
import {
  type ComponentRef,
  type CSSProperties,
  type JSX,
  useEffect,
  useRef,
} from 'react'
import { useEffectOnce } from 'react-use'
import { useFroala } from '../../provider/FroalaProvider'

type Props = {
  styleAgainstFroalaBlinks?: CSSProperties
}

export const StaticHtml = (props: Props): JSX.Element => {
  const staticHtmlRef = useRef<ComponentRef<'div'>>(null)
  const froala = useFroala()

  // insert html into element
  useEffectOnce(() => {
    if (staticHtmlRef.current !== null) {
      staticHtmlRef.current.innerHTML = froala.htmlGetter()
    }
  })

  // save height after loading content
  useEffect(() => {
    if (staticHtmlRef.current?.clientHeight !== undefined) {
      froala.fixedHeightRef.current =
        staticHtmlRef.current.getBoundingClientRect().height
    }
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
            ...props.styleAgainstFroalaBlinks,
            ...froala.style,
          }}
          sx={froala.sx}
        />
      </Box>
    </Box>
  )
}
