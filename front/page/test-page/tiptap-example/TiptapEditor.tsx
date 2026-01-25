import { type JSX, useEffect, useState } from 'react'
import {
  type EditorEvents,
  type UseEditorOptions,
  useEditor,
  EditorContent,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
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

export const TiptapEditor = (props: Props): JSX.Element => {
  const [isReady, setIsReady] = useState(false)

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        TextStyle,
        Color,
        Highlight.configure({ multicolor: true }),
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Image,
        Placeholder.configure({ placeholder: props.placeholder }),
      ],
      content: props.content,
      onUpdate: props.onUpdate,
      onCreate: () => {
        setIsReady(true)
      },
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
        visibility: isReady === true ? 'visible' : 'hidden',
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
