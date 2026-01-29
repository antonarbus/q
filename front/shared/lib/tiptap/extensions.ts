import type { AnyExtension } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import { ResizableImage } from './ResizableImage'

export const extensions: AnyExtension[] = [
  StarterKit,
  TextStyle,
  Color,
  Highlight.configure({ multicolor: true }),
  TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
  ResizableImage.configure({
    allowBase64: true,
    resize: {
      enabled: true,
      directions: ['bottom-right', 'bottom-left'],
      alwaysPreserveAspectRatio: true,
    },
  }),
  Link.configure({ openOnClick: false }),
]
