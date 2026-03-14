import type { EditorEvents } from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'
import type { EditorRef, OnUpload } from '@shared/lib/tiptap/types'
import type { CSSObject } from '@mui/material'
import { TiptapProvider } from '../lib/tiptap/provider/TiptapProvider'
import { TiptapEditor } from '../lib/tiptap/TiptapEditor'

type Props = {
  editorRef: EditorRef
  placeholder: string
  className: string
  sx: CSSObject
  contentGetter: () => string
  onCreate?: (props: EditorEvents['create']) => void
  onUpdate: (props: EditorEvents['update']) => void
  onBlur?: (props: EditorEvents['blur']) => void
  onKeyDown?: (view: EditorView, event: KeyboardEvent) => boolean
  onWrapperClick?: (event: React.MouseEvent) => void
  onWrapperFocus?: (event: React.FocusEvent) => void
  onUpload?: OnUpload
}

export const TextEditor = (props: Props): React.JSX.Element => {
  return (
    <TiptapProvider {...props}>
      <TiptapEditor />
    </TiptapProvider>
  )
}
