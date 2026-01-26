import { type JSX, useEffect } from 'react'
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

type Props = {
  editorRef: EditorRef
  placeholder: string
  content: UseEditorOptions['content']
  onUpdate: (props: EditorEvents['update']) => void
  onCreate?: (props: EditorEvents['create']) => void
  onBlur?: (props: EditorEvents['blur']) => void
}

export const TiptapEditor = (props: Props): JSX.Element => {
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
      onCreate: props.onCreate,
      onUpdate: props.onUpdate,
      onBlur: props.onBlur,
    },
    [],
  )

  useEffect(() => {
    props.editorRef.current = editor
  }, [editor, props.editorRef])

  return (
    <>
      <FloatingMenu editor={editor} />
      <EditorContent
        editor={editor}
        className='tiptap-editor'
        style={{
          flexGrow: 1,
        }}
      />
    </>
  )
}
