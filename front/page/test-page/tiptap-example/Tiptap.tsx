import type { JSX } from 'react'
import type { EditorEvents, UseEditorOptions } from '@tiptap/react'
import type { EditorRef } from '@shared/lib/tiptap/types'
import type { CSSObject } from '@mui/material'
import { StaticHtml } from './StaticHtml'
import { TiptapEditor } from './TiptapEditor'

type Props = {
  editorRef: EditorRef
  className: string
  placeholder: string
  sx: CSSObject
  content: UseEditorOptions['content']
  onUpdate: (props: EditorEvents['update']) => void
  isEditorActive: boolean
}

export const Tiptap = (props: Props): JSX.Element => {
  if (props.isEditorActive === false) {
    return (
      <StaticHtml
        className={props.className}
        content={typeof props.content === 'string' ? props.content : ''}
        sx={props.sx}
      />
    )
  }

  return (
    <TiptapEditor
      editorRef={props.editorRef}
      className={props.className}
      placeholder={props.placeholder}
      sx={props.sx}
      content={props.content}
      onUpdate={props.onUpdate}
    />
  )
}
