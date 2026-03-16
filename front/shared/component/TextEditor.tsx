import type { EditorEvents } from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'
import type { OnUpload } from '@shared/lib/tiptap/types'
import type { CSSObject } from '@mui/material'
import type { BlockKeyProps, RowKeyProps } from '../lib/tiptap/editorRegistry'
import { TiptapProvider } from '../lib/tiptap/provider/TiptapProvider'
import { TiptapEditor } from '../lib/tiptap/TiptapEditor'

type Props = {
  registryKey: BlockKeyProps | RowKeyProps
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
