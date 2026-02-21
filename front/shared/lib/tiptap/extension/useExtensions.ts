import type { AnyExtension } from '@tiptap/react'
import { useMemo } from 'react'
// Nodes
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Blockquote from '@tiptap/extension-blockquote'
import CodeBlock from '@tiptap/extension-code-block'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
// Lists
import {
  BulletList,
  OrderedList,
  ListItem,
  ListKeymap,
  TaskList,
  TaskItem,
} from '@tiptap/extension-list'
// Marks
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
// Styling
import TextAlign from '@tiptap/extension-text-align'
// Utilities
import {
  Dropcursor,
  Gapcursor,
  Placeholder,
  UndoRedo,
  TrailingNode,
} from '@tiptap/extensions'
// Table
import { TableKit } from '@tiptap/extension-table'
// YouTube
import Youtube from '@tiptap/extension-youtube'
// Custom
import { ResizableImage } from './image/ResizableImage'
import { useTiptapCtx } from '../provider/TiptapProvider'
import { cls } from '@shared/cls'

export const useExtensions = (): AnyExtension[] => {
  const tiptapCtx = useTiptapCtx()

  const extensions = useMemo<AnyExtension[]>(() => {
    const exts: AnyExtension[] = [
      // Nodes
      Document, // mandatory top node
      Paragraph,
      Text,

      // smth
      TextStyle,
      Dropcursor,
      Gapcursor,
      Placeholder.configure({ placeholder: tiptapCtx.placeholder }),
      UndoRedo,
      TrailingNode,
      // Table
      TableKit.configure({
        table: { resizable: true },
      }),
      // YouTube
      Youtube.configure({
        addPasteHandler: true,
      }),
      // Custom
      ResizableImage.configure({
        allowBase64: true,
        resize: {
          enabled: true,
          directions: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
          alwaysPreserveAspectRatio: true,
        },
      }),

      // Row 1, block 1
      Bold,
      Italic,
      Underline,
      Strike,

      // Row 1, block 2
      Color,
      Highlight.configure({ multicolor: true }),

      // Row 1, block 3
      Heading.configure({ levels: [1, 2, 3, 4, 5] }),

      // Row 2, block 1
      ListItem,
      ListKeymap,
      BulletList,
      OrderedList,
      TaskList,
      TaskItem.configure({ nested: true }),

      // Row 2, block 2
      Blockquote,
      Code,
      CodeBlock,
      HorizontalRule,

      // Row 2, block 3
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),

      // Row 2, block 4
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
          class: cls.tiptapLink,
        },
      }),
    ]

    return exts
  }, [tiptapCtx.placeholder])

  return extensions
}
