import type { SxProps } from '@mui/material'
import type { FroalaEditor, FroalaEditorRef } from '@shared/types/froala'

export type FroalaProps = {
  htmlGetter: () => string
  editorRef: FroalaEditorRef
  placeholder?: string
  style?: React.CSSProperties
  sx?: SxProps
  onContentChange: () => void
  onFocus?: () => void
  onClick?: (e: React.MouseEvent) => void
  onBlur?: (e: React.MouseEvent) => void
  onKeydown?: (e: React.KeyboardEvent) => void
  onInitialized?: () => void
  className?: string
  droppable?: boolean
  wrapperStyles?: React.CSSProperties
  beforeUpload?: ({
    editor,
    files,
    type,
  }: {
    editor: FroalaEditor | null
    files: File[]
    type: 'image' | 'file'
  }) => false | undefined
}
