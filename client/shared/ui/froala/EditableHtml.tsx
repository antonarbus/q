import type { SxProps } from '@mui/material'
import { Box } from '@mui/material'
import { useStartFroala } from './useStartFroala'
import { usePutCaretAtTheEndOfText } from './usePutCaretAtTheEndOfText'
import type { MutableRefObject } from 'react'
import type { ISaveFroalaReducer } from './Froala'
import type { RefDiv } from 'client/shared/types'
import type FroalaEditor from 'froala-editor'

interface IProps {
  index: number
  padding?: number | string
  getHtml: () => string
  froalaElementRef: RefDiv
  editorRef: MutableRefObject<FroalaEditor | null>
  placeholder?: string
  additionalStyle?: SxProps
  onClickAwayIfHtmChanged?: () => void
  rowIndex?: number
  saveFroalaReducer: ISaveFroalaReducer
  heightDuringAnimationRef: MutableRefObject<number | undefined>
}

export const EditableHtml = ({
  additionalStyle,
  editorRef,
  froalaElementRef,
  index,
  getHtml,
  onClickAwayIfHtmChanged,
  padding,
  placeholder,
  rowIndex,
  saveFroalaReducer,
  heightDuringAnimationRef,
}: IProps): JSX.Element => {
  useStartFroala({
    editorRef,
    froalaElementRef,
    index,
    getHtml,
    onClickAwayIfHtmChanged,
    placeholder,
    rowIndex,
    saveFroalaReducer,
  })
  usePutCaretAtTheEndOfText({
    index,
    editorRef,
    froalaElementRef,
  })

  return (
    <Box
      ref={froalaElementRef}
      className='q-froala-element'
      style={{
        padding: padding ?? 0,
        height: heightDuringAnimationRef.current ?? 'auto', // for animation, will be removed after froala is initialized
      }}
      sx={{
        wordBreak: 'break-word',
        '& .fr-element:hover:not(:focus)': {
          textShadow: '0px 0px 0.8px',
        },
        ...additionalStyle,
      }}
    />
  )
}
