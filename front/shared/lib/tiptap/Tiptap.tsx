import type { JSX } from 'react'
import type { EditorEvents } from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'
import type { EditorRef } from '@shared/lib/tiptap/types'
import { type CSSObject, Box } from '@mui/material'
import { StaticHtml } from './StaticHtml'
import { TiptapEditor } from './TiptapEditor'
import { tiptapStyles } from './styles'

type Props = {
  editorRef: EditorRef
  className: string
  placeholder: string
  sx: CSSObject
  content: string
  onCreate?: (props: EditorEvents['create']) => void
  onUpdate: (props: EditorEvents['update']) => void
  onBlur?: (props: EditorEvents['blur']) => void
  onKeyDown?: (view: EditorView, event: KeyboardEvent) => boolean
  onWrapperClick?: (event: React.MouseEvent) => void
  onWrapperFocus?: (event: React.FocusEvent) => void
  isEditorActive: boolean
}

export const Tiptap = (props: Props): JSX.Element => {
  if (props.isEditorActive === false) {
    return (
      <StaticHtml
        className={props.className}
        content={props.content}
        sx={props.sx}
      />
    )
  }

  return (
    <Box
      className={props.className}
      onClick={props.onWrapperClick}
      onFocus={props.onWrapperFocus}
      sx={{
        ...tiptapStyles,
        ...props.sx,
        position: 'relative',
      }}
    >
      <TiptapEditor
        editorRef={props.editorRef}
        placeholder={props.placeholder}
        content={props.content}
        onCreate={props.onCreate}
        onUpdate={props.onUpdate}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
      />
    </Box>
  )
}
