import type { JSX } from 'react'
import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
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

const initialContent = `<p>This is <strong>Tiptap</strong></p>`

export const TiptapExample = (): JSX.Element => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        TextStyle,
        Color,
        Highlight.configure({ multicolor: true }),
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Link.configure({ openOnClick: false }),
        Image,
        Placeholder.configure({ placeholder: 'Start typing...' }),
      ],
      content: initialContent,
    },
    [],
  )

  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
      }}
    >
      <FloatingMenu editor={editor} />
      <EditorContent editor={editor} />
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
    </div>
  )
}
