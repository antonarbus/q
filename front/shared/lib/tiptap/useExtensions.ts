import type { AnyExtension } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import { ResizableImage } from './ResizableImage'
import { useMemo } from 'react'
import Placeholder from '@tiptap/extension-placeholder'

type Props = {
  placeholder: string
}

export const useExtensions = (props: Props): AnyExtension[] => {
  const extensions = useMemo<AnyExtension[]>(() => {
    const exts: AnyExtension[] = [
      StarterKit,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
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
