import type { EditorEvents } from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'
import type { OnUpload } from '@front/shared/lib/tiptap/types'
import type { CSSObject } from '@mui/material'
import type { RegistryKey } from '../lib/tiptap/editorRegistry'
import { TiptapProvider } from '../lib/tiptap/provider/TiptapProvider'
import { TiptapEditor } from '../lib/tiptap/TiptapEditor'

type Props = {
  registryKey: RegistryKey
  isFullAppView: boolean
  placeholder: string
  className: string
  sx: CSSObject
  contentGetter: () => string
  onCreate?: (props: EditorEvents['create']) => void
  onChange: (props: EditorEvents['update']) => void
  onFocusOut?: (props: EditorEvents['blur']) => void
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
