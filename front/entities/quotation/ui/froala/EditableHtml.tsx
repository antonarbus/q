import { Box } from '@mui/material'
import type { JSX } from 'react'
import { useFroala } from '../../provider/FroalaProvider'
import { useStartFroala } from './useStartFroala'

export const EditableHtml = (): JSX.Element => {
  const froala = useFroala()
  useStartFroala()

  return (
    <Box
      className='editable-html'
      ref={froala.froalaElementRef}
      style={{
        height: froala.froalaHeightRef.current, // needed for animation, height will be removed after froala is initialized
        wordBreak: 'break-word',
        ...froala.style,
      }}
      sx={froala.sx}
    />
  )
}
