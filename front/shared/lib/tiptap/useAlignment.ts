import { type Editor, useEditorState } from '@tiptap/react'

type Alignment = 'left' | 'center' | 'right'

type Props = {
  editor: Editor
}

/**
 * Hook to get the current alignment.
 * Re-renders when editor state changes.
 */
export const useAlignment = (props: Props): Alignment => {
  const alignment = useEditorState({
    editor: props.editor,
    selector: (ctx): Alignment => {
      if (ctx.editor.isActive({ textAlign: 'center' })) {
        return 'center'
      }

      if (ctx.editor.isActive({ textAlign: 'right' })) {
        return 'right'
      }

      return 'left'
    },
  })

  return alignment
}
