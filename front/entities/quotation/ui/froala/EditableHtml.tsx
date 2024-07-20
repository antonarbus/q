import { Box } from '@mui/material'
import { useFroala } from '../../providers/FroalaProvider'
import { useStartFroala } from './useStartFroala'

export const EditableHtml = (): JSX.Element => {
  const { style, froalaElementRef, froalaHeightRef, sx } = useFroala()
  useStartFroala()

  return (
    <Box
      ref={froalaElementRef}
      className='editable-html'
      style={{
        height: froalaHeightRef.current, // needed for animation, height will be removed after froala is initialized
        wordBreak: 'break-word',
        ...style,
      }}
      sx={sx}
    />
  )
}
