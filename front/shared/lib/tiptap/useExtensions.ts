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
import HardBreak from '@tiptap/extension-hard-break'

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
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
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

// Custom
import { ResizableImage } from './ResizableImage'

type Props = {
  placeholder: string
}

export const useExtensions = (props: Props): AnyExtension[] => {
  const extensions = useMemo<AnyExtension[]>(() => {
    const exts: AnyExtension[] = [
      // Nodes
      Document,
      Paragraph,
      Text,
      Heading,
      Blockquote,
      CodeBlock,
      HorizontalRule,
      HardBreak,

      // Lists
      BulletList,
      OrderedList,
      ListItem,
      ListKeymap,
      TaskList,
      TaskItem.configure({ nested: true }),

      // Marks
      Bold,
      Italic,
      Strike,
      Code,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Subscript,
      Superscript,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),

      // Styling
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),

      // Utilities
      Dropcursor,
      Gapcursor,
      Placeholder.configure({ placeholder: props.placeholder }),
      UndoRedo,
      TrailingNode,

      // Custom
      ResizableImage.configure({
        allowBase64: true,
        resize: {
          enabled: true,
          directions: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
          alwaysPreserveAspectRatio: true,
        },
      }),
    ]

    return exts
  }, [])

  return extensions
}
