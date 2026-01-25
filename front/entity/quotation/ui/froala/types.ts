import type { CSSObject } from '@mui/material'
import type { KeyboardEvent, MouseEvent } from 'react'
import type { Editor } from '@tiptap/react'

export type FroalaProps = {
  // htmlGetter: () => string
  // editorRef: EditorRef
  placeholder?: string
  style?: CSSObject
  sx?: CSSObject
  // onContentChange: () => void
  onFocus?: () => void
  onClick?: (e: MouseEvent) => void
  onBlur?: (e: MouseEvent) => void
  onKeydown?: (e: KeyboardEvent) => void
  onInitialized?: () => void
  // className?: string
  droppable?: boolean
  wrapperStyles?: CSSObject
  beforeUpload?: ({
    editor,
    files,
    type,
  }: {
    editor: Editor | null
    files: File[]
    type: 'image' | 'file'
  }) => Promise<void>
}
