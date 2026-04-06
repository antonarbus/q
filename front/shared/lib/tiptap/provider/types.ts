import type { EditorEvents } from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'
import type { OnUpload } from '../types'
import type { CSSObject } from '@mui/material'
import type { RegistryKey } from '../editorRegistry'

export type Props = {
  registryKey: RegistryKey
  isEditorView: boolean
  placeholder: string
  contentGetter: () => string
  className: string
  sx: CSSObject
  onCreate?: (props: EditorEvents['create']) => void
  onChange: (props: EditorEvents['update']) => void
  onFocusOut?: (props: EditorEvents['blur']) => void
  onKeyDown?: (view: EditorView, event: KeyboardEvent) => boolean
  onWrapperClick?: (event: React.MouseEvent) => void
  onWrapperFocus?: (event: React.FocusEvent) => void
  onUpload?: OnUpload
  children: React.ReactNode
}

export type Res = Omit<Props, 'children'>
