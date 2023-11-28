import type { SxProps } from '@mui/material'
import type { MutableRefObject, RefObject } from 'react'
import type FroalaEditor from 'froala-editor'
import { Box } from '@mui/material'
import { useStartFroala } from './useStartFroala'
import { usePutCaretAtTheEnd } from './usePutCaretAtTheEnd'

type Props = {
  itemIndex: number
  htmlGetter: () => string
  froalaElementRef: RefObject<HTMLDivElement>
  editorRef: MutableRefObject<FroalaEditor | null>
  placeholder?: string
  additionalStyle?: SxProps
  rowIndex?: number
  onContentChange: () => void
  froalaHeightRef: MutableRefObject<number | undefined>
}

export const EditableHtml = ({
  additionalStyle,
  editorRef,
  froalaElementRef,
  itemIndex,
  htmlGetter,
  placeholder,
  rowIndex,
  onContentChange,
  froalaHeightRef,
}: Props): JSX.Element => {
  useStartFroala({
    editorRef,
    froalaElementRef,
    itemIndex,
    htmlGetter,
    placeholder,
    rowIndex,
    onContentChange,
  })

  usePutCaretAtTheEnd({ itemIndex, editorRef, froalaElementRef })

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
