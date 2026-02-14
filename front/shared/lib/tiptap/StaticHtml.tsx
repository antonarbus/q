import { type CSSObject, Box } from '@mui/material'
import type { JSX } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { useExtensions } from './extension/useExtensions'
import { tiptapStyles } from './style/tiptapStyles'
import { cls } from '@shared/cls'

type Props = {
  className: string
  content: string
  sx: CSSObject
}

export const StaticHtml = (props: Props): JSX.Element => {
  const extensions = useExtensions()

  const editor = useEditor(
    {
      extensions,
      content: props.content,
      editable: false,
    },
    [props.content],
  )

  return (
    <Box
      className={`${cls.notEditable} ${props.className}`}
      sx={{
        opacity: 0.5,
        ...tiptapStyles,
        ...props.sx,
      }}
    >
      <EditorContent
        editor={editor}
        style={{
          flexGrow: 1,
        }}
      />
    </Box>
  )
}
