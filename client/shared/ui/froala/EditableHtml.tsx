import type { SxProps } from '@mui/material'
import type { MutableRefObject, RefObject } from 'react'
import type { OnFroalaContentChange } from 'client/shared/types'
import type FroalaEditor from 'froala-editor'
import { Box } from '@mui/material'
import { useStartFroala } from './useStartFroala'
import { usePutCaretAtTheEndOfText } from './usePutCaretAtTheEndOfText'

interface Props {
  index: number
  padding?: number | string
  initHtmlGetter: () => string
  froalaElementRef: RefObject<HTMLDivElement>
  editorRef: MutableRefObject<FroalaEditor | null>
  placeholder?: string
  additionalStyle?: SxProps
  rowIndex?: number
  onContentChange: OnFroalaContentChange
  heightDuringAnimationRef: MutableRefObject<number | undefined>
}

export const EditableHtml = ({
  additionalStyle,
  editorRef,
  froalaElementRef,
  index,
  initHtmlGetter,
  padding,
  placeholder,
  rowIndex,
  onContentChange,
  heightDuringAnimationRef,
}: Props): JSX.Element => {
  useStartFroala({
    editorRef,
    froalaElementRef,
    index,
    initHtmlGetter,
    placeholder,
    rowIndex,
    onContentChange,
  })

  usePutCaretAtTheEndOfText({ index, editorRef, froalaElementRef })

  return (
    <Box
      ref={froalaElementRef}
      style={{
        padding: padding ?? 0,
        height: heightDuringAnimationRef.current ?? 'auto', // for animation, will be removed after froala is initialized
      }}
      sx={{
        wordBreak: 'break-word',
        ...additionalStyle,
      }}
    />
  )
}
