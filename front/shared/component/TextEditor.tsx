import type { JSX } from 'react'
import type { EditorEvents } from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'
import type { EditorRef, OnUpload } from '@shared/lib/tiptap/types'
import type { CSSObject } from '@mui/material'
import { EditorStatic } from '../lib/tiptap/EditorStatic'
import { TiptapProvider } from '../lib/tiptap/provider/TiptapProvider'
import { EditorNotStatic } from '../lib/tiptap/EditorNotStatic'

type Props = {
  editorRef: EditorRef
  placeholder: string
  className: string
  sx: CSSObject
  content: string
  onCreate?: (props: EditorEvents['create']) => void
  onUpdate: (props: EditorEvents['update']) => void
  onBlur?: (props: EditorEvents['blur']) => void
  onKeyDown?: (view: EditorView, event: KeyboardEvent) => boolean
  onWrapperClick?: (event: React.MouseEvent) => void
  onWrapperFocus?: (event: React.FocusEvent) => void
  onUpload?: OnUpload
}

export const TextEditor = (props: Props): JSX.Element => {
  return (
    <TiptapProvider {...props}>
      <EditorNotStatic />
      <EditorStatic />
    </TiptapProvider>
  )
}
