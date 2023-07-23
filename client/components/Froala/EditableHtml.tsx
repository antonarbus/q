import parseHtml from 'html-react-parser'
import { Box, SxProps } from '@mui/material'
import { useStartFroala } from './useStartFroala'
import { usePutCaretAtTheEndOfText } from './usePutCaretAtTheEndOfText'
import { MutableRefObject } from 'react'
import { SaveFroalaReducer } from './Froala'
import { RefAny, RefDiv } from 'client/types'

type Props = {
  index: number
  padding?: number | string
  initHtml: string
  froalaElementRef: RefDiv
  editorRef: RefAny
  placeholder?: string
  additionalStyle?: SxProps
  onClickAwayIfHtmChanged?: Function
  rowIndex?: number
  saveFroalaReducer: SaveFroalaReducer
  heightDuringAnimationRef: MutableRefObject<number | undefined>
}

export const EditableHtml = ({
  additionalStyle,
  editorRef,
  froalaElementRef,
  index,
  initHtml,
  onClickAwayIfHtmChanged,
  padding,
  placeholder,
  rowIndex,
  saveFroalaReducer,
  heightDuringAnimationRef,
}: Props) => {
  useStartFroala({ editorRef, froalaElementRef, index, initHtml, onClickAwayIfHtmChanged, placeholder, rowIndex, saveFroalaReducer })
  usePutCaretAtTheEndOfText({ index, editorRef, froalaElementRef })

  return (
    <Box
      ref={froalaElementRef}
      className='q-froala-element'
      style={{
        padding: padding || 0,
        height: heightDuringAnimationRef.current || 'auto', // for animation, will be removed after froala is initialized
      }}
      sx={{
        wordBreak: 'break-word',
        '& .fr-element:hover:not(:focus)': {
          textShadow: '0px 0px 0.8px',
        },
        ...additionalStyle,
      }}
    >
      {parseHtml(initHtml)}
    </Box>
  )
}
