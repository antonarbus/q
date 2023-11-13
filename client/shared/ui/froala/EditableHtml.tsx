import type { SxProps } from '@mui/material'
import type { MutableRefObject, RefObject } from 'react'
import type FroalaEditor from 'froala-editor'
import { Box } from '@mui/material'
import { useStartFroala } from './useStartFroala'
import { usePutCaretAtTheEndOfText } from './usePutCaretAtTheEndOfText'

type Props = {
  itemIndex: number
  padding?: number | string
  initHtml: string
  froalaElementRef: RefObject<HTMLDivElement>
  editorRef: MutableRefObject<FroalaEditor | null>
  placeholder?: string
  additionalStyle?: SxProps
  rowIndex?: number
  onContentChange: () => void
  heightDuringAnimationRef: MutableRefObject<number | undefined>
}

export const EditableHtml = ({
  additionalStyle,
  editorRef,
  froalaElementRef,
  itemIndex,
  initHtml,
  padding,
  placeholder,
  rowIndex,
  onContentChange,
  heightDuringAnimationRef,
}: Props): JSX.Element => {
  useStartFroala({
    editorRef,
    froalaElementRef,
    itemIndex,
    initHtml,
    placeholder,
    rowIndex,
    onContentChange,
  })

  usePutCaretAtTheEndOfText({ itemIndex, editorRef, froalaElementRef })

  return (
    <Box
      ref={froalaElementRef}
      className='editable-html'
      style={{
        padding: padding ?? 0,
        height: heightDuringAnimationRef.current ?? 'auto', // needed for animation, height will be removed after froala is initialized
      }}
      sx={{
        wordBreak: 'break-word',
        ...additionalStyle,
      }}
    />
  )
}
