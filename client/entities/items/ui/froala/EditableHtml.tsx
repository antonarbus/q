import { Box } from '@mui/material'
import { useStartFroala } from './useStartFroala'
import { usePutCaretAtTheEnd } from './usePutCaretAtTheEnd'
import { useFroala } from '../../providers/FroalaProvider'

export const EditableHtml = (): JSX.Element => {
  const { additionalStyle, froalaElementRef, froalaHeightRef } = useFroala()
  useStartFroala()
  usePutCaretAtTheEnd()

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
