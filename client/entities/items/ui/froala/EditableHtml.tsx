import { Box } from '@mui/material'
import { useFroala } from '../../providers/FroalaProvider'
import { useStartFroala } from './useStartFroala'

export const EditableHtml = (): JSX.Element => {
  const { additionalStyle, froalaElementRef, froalaHeightRef } = useFroala()
  useStartFroala()

  return (
    <Box
      ref={froalaElementRef}
      className='editable-html'
      style={{
        height: froalaHeightRef.current ?? 'auto', // needed for animation, height will be removed after froala is initialized
      }}
      sx={{
        wordBreak: 'break-word',
        ...additionalStyle,
      }}
    />
  )
}
