import { type JSX, useEffect } from 'react'
import {
  type EditorEvents,
  type UseEditorOptions,
  useEditor,
  EditorContent,
  // Editor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { FloatingMenu } from './FloatingMenu'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  editorRef: EditorRef
  content: UseEditorOptions['content']
  onContentChange: (props: EditorEvents['update']) => void
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
        Placeholder.configure({ placeholder: 'Start typing...' }),
      ],
      content: props.content,
      onUpdate: props.onContentChange,
    },
    [],
  )

  useEffect(() => {
    props.editorRef.current = editor
  }, [editor, props.editorRef])

  return (
    <>
      <FloatingMenu editor={editor} />
      <EditorContent editor={editor} />
      {/* <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
        <button
          type='button'
          onClick={() => {
            const html = editor.getHTML()
            alert(html)
          }}
        >
          Get html
        </button>
        <button
          type='button'
          onClick={() => {
            editor.commands.setContent('<span style="color: red;">Hello</span>')
          }}
        >
          Set html
        </button>
      </div> */}
    </>
  )
}
