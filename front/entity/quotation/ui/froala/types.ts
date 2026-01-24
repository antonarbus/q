import type { SxProps } from '@mui/material'
import type { CSSProperties, KeyboardEvent, MouseEvent } from 'react'
import type { Editor } from '@tiptap/react'
import type { EditorRef } from '@shared/lib/tiptap/types'

export type FroalaProps = {
  htmlGetter: () => string
  editorRef: EditorRef
  placeholder?: string
  style?: CSSProperties
  sx?: SxProps
  onContentChange: () => void
  onFocus?: () => void
  onClick?: (e: MouseEvent) => void
  onBlur?: (e: MouseEvent) => void
  onKeydown?: (e: KeyboardEvent) => void
  onInitialized?: () => void
  className?: string
  droppable?: boolean
  wrapperStyles?: CSSProperties
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
