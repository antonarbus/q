import { type CSSObject, Box } from '@mui/material'
import type { JSX } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { useExtensions } from './useExtensions'
import { tiptapStyles } from './tiptapStyles'

type Props = {
  className: string
  content: string
  sx: CSSObject
  placeholder: string
}

export const StaticHtml = (props: Props): JSX.Element => {
  const extensions = useExtensions({ placeholder: props.placeholder })

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
