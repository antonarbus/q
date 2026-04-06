import type { AnyExtension } from '@tiptap/react'
import { useMemo } from 'react'
// Nodes
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { Heading } from '@tiptap/extension-heading'
import { Blockquote } from '@tiptap/extension-blockquote'
import { CodeBlock } from '@tiptap/extension-code-block'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import {
  BulletList,
  OrderedList,
  ListItem,
  ListKeymap,
  TaskList,
  TaskItem,
} from '@tiptap/extension-list'
import { Bold } from '@tiptap/extension-bold'
import { Italic } from '@tiptap/extension-italic'
import { Strike } from '@tiptap/extension-strike'
import { Code } from '@tiptap/extension-code'
import { Underline } from '@tiptap/extension-underline'
import { Link } from '@tiptap/extension-link'
import { TextStyle, FontSize, FontFamily, LineHeight } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'
import { TextAlign } from '@tiptap/extension-text-align'
import { Dropcursor, Gapcursor, Placeholder, UndoRedo, TrailingNode } from '@tiptap/extensions'
import { TableCell, TableHeader, TableKit } from '@tiptap/extension-table'
import { Youtube } from '@tiptap/extension-youtube'
import { ResizableImage } from './image/ResizableImage'
import { useTiptapCtx } from '../provider/useTiptapCtx'
import { cls } from '@front/shared/cls'

const tableCellTextAlignAttribute = {
  default: 'center',
  parseHTML: (element: HTMLElement): string => {
    const textAlign = element.style.textAlign === '' ? 'center' : element.style.textAlign

    element.style.textAlign = textAlign

    return textAlign
  },
  renderHTML: (attributes: Record<string, string>): Record<string, string> => ({
    style: `text-align: ${attributes.textAlign ?? 'center'}`,
  }),
}

export const useExtensions = (): AnyExtension[] => {
  const tiptapCtx = useTiptapCtx()

  const extensions = useMemo<AnyExtension[]>(() => {
    const exts: AnyExtension[] = [
      Document,
      Paragraph,
      Text,
      TextStyle,
      FontSize,
      FontFamily,
      LineHeight,
      Dropcursor,
      Gapcursor,
      Placeholder.configure({
        placeholder: tiptapCtx.placeholder,
      }),
      UndoRedo,
      TrailingNode,
      TableKit.configure({
        table: { resizable: true },
        tableCell: false,
        tableHeader: false,
      }),
      TableCell.extend({
        addAttributes() {
          return { ...this.parent?.(), textAlign: tableCellTextAlignAttribute }
        },
      }),
      TableHeader.extend({
        addAttributes() {
          return { ...this.parent?.(), textAlign: tableCellTextAlignAttribute }
        },
      }),
      Youtube.configure({
        addPasteHandler: true,
      }),
      ResizableImage.configure({
        allowBase64: true,
        resize: {
          enabled: tiptapCtx.isEditorView,
          directions: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
          alwaysPreserveAspectRatio: true,
        },
      }),
      Bold,
      Italic,
      Underline,
      Strike,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),
      ListItem,
      ListKeymap,
      BulletList,
      OrderedList,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Blockquote,
      Code,
      CodeBlock,
      HorizontalRule,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image', 'tableCell', 'tableHeader'],
      }),
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
