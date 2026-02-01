import { type CSSObject, Box } from '@mui/material'
import type { JSX } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { extensions } from './extensions'
import { tiptapStyles } from './tiptapStyles'

type Props = {
  className: string
  content: string
  sx: CSSObject
}

export const StaticHtml = (props: Props): JSX.Element => {
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
      className={props.className}
      sx={{
        ...tiptapStyles,
        ...props.sx,
      }}
    >
      <EditorContent
        editor={editor}
        style={{
          flexGrow: 1,
          opacity: 0.5,
        }}
      />
    </Box>
  )
}
