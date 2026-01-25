import { type JSX, useEffect } from 'react'
import {
  type EditorEvents,
  type UseEditorOptions,
  useEditor,
  EditorContent,
  // Editor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
// import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
// import Link from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { FloatingMenu } from './FloatingMenu'
import type { EditorRef } from '@shared/lib/tiptap/types'
import { type CSSObject, Box } from '@mui/material'
import { tiptapStyles } from './styles'

type Props = {
  editorRef: EditorRef
  className: string
  placeholder: string
  sx: CSSObject
  content: UseEditorOptions['content']
  onUpdate: (props: EditorEvents['update']) => void
}

export const Tiptap = (props: Props): JSX.Element => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        // Underline,
        TextStyle,
        Color,
        Highlight.configure({ multicolor: true }),
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        // Link.configure({ openOnClick: false }),
        Image,
        Placeholder.configure({ placeholder: props.placeholder }),
      ],
      content: props.content,
      onUpdate: props.onUpdate,
    },
    [],
  )

  useEffect(() => {
    props.editorRef.current = editor
  }, [editor, props.editorRef])

  return (
    <Box
      className={props.className}
      sx={{
        ...tiptapStyles,
        ...props.sx,
      }}
    >
      <FloatingMenu editor={editor} />
      <EditorContent
        editor={editor}
        className='tiptap-editor'
        style={{ flexGrow: 1 }}
      />
    </Box>
  )
}
