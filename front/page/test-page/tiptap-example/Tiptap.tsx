import { type JSX, useState } from 'react'
import type { EditorEvents } from '@tiptap/react'
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
  onUpdate: (props: EditorEvents['update']) => void
  isEditorActive: boolean
}

export const Tiptap = (props: Props): JSX.Element => {
  const [isEditorReady, setIsEditorReady] = useState(false)

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
    <Box
      className={props.className}
      sx={{
        ...tiptapStyles,
        ...props.sx,
        position: 'relative',
      }}
    >
      {isEditorReady === false && (
        <Box
          dangerouslySetInnerHTML={{ __html: props.content }}
          sx={{
            ...props.sx,
            position: 'absolute',
            wordBreak: 'break-word',
            inset: 0,
            flexGrow: 1,
          }}
        />
      )}
      <TiptapEditor
        editorRef={props.editorRef}
        placeholder={props.placeholder}
        content={props.content}
        onUpdate={props.onUpdate}
        onReady={() => {
          setIsEditorReady(true)
        }}
        isReady={isEditorReady}
      />
    </Box>
  )
}
