import type { SxProps } from '@mui/material'
import type { FroalaEditor, FroalaEditorRef } from '@shared/type/froala'
import type { CSSProperties, MouseEvent, KeyboardEvent } from 'react'

export type FroalaProps = {
  htmlGetter: () => string
  editorRef: FroalaEditorRef
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
    editor: FroalaEditor | null
    files: File[]
    type: 'image' | 'file'
  }) => Promise<void>
}
