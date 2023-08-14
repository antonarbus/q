import type { SxProps } from '@mui/material'
import { Box } from '@mui/material'
import { useStartFroala } from './useStartFroala'
import { usePutCaretAtTheEndOfText } from './usePutCaretAtTheEndOfText'
import type { MutableRefObject } from 'react'
import type { RefDiv, TOnFroalaContentChange } from 'client/shared/types'
import type FroalaEditor from 'froala-editor'

interface IProps {
  index: number
  padding?: number | string
  getHtml: () => string
  froalaElementRef: RefDiv
  editorRef: MutableRefObject<FroalaEditor | null>
  placeholder?: string
  additionalStyle?: SxProps
  rowIndex?: number
  onContentChange: TOnFroalaContentChange
  heightDuringAnimationRef: MutableRefObject<number | undefined>
}

export const EditableHtml = ({
  additionalStyle,
  editorRef,
  froalaElementRef,
  index,
  getHtml,
  padding,
  placeholder,
  rowIndex,
  onContentChange,
  heightDuringAnimationRef,
}: IProps): JSX.Element => {
  useStartFroala({
    editorRef,
    froalaElementRef,
    index,
    getHtml,
    placeholder,
    rowIndex,
    onContentChange,
  })

  usePutCaretAtTheEndOfText({
    index,
    editorRef,
    froalaElementRef,
  })

  return (
    <Box
      ref={froalaElementRef}
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
