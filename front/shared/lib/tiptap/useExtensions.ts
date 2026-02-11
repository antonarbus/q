import type { AnyExtension } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import { ResizableImage } from './ResizableImage'
import { useMemo } from 'react'
import Placeholder from '@tiptap/extension-placeholder'

type Props = {
  placeholder: string
}

export const useExtensions = (props: Props): AnyExtension[] => {
  const extensions = useMemo<AnyExtension[]>(() => {
    const exts: AnyExtension[] = [
      StarterKit.configure({
        link: {
          openOnClick: false,
          HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Subscript,
      Superscript,
      Placeholder.configure({ placeholder: props.placeholder }),
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
