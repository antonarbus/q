import { Box } from '@mui/material'
import { useFroala } from '../../providers/FroalaProvider'
import { useStartFroala } from './useStartFroala'

export const EditableHtml = (): React.JSX.Element => {
  const { style, froalaElementRef, froalaHeightRef, sx } = useFroala()
  useStartFroala()

  return (
    <Box
      className='editable-html'
      ref={froalaElementRef}
      style={{
        height: froalaHeightRef.current, // needed for animation, height will be removed after froala is initialized
        wordBreak: 'break-word',
        ...style,
      }}
      sx={sx}
    />
  )
}
