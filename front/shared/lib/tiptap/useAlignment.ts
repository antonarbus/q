import { type Editor, useEditorState } from '@tiptap/react'

type Alignment = 'left' | 'center' | 'right'

type Props = {
  editor: Editor
}

type Res = {
  isActive: (alignment: Alignment) => boolean
  current: Alignment
}

/**
 * Hook to get the current alignment and check if a specific alignment is active.
 * Re-renders when editor state changes.
 */
export const useAlignment = (props: Props): Res => {
  const currentAlignment = useEditorState({
    editor: props.editor,
    selector: (ctx): Alignment => {
      console.log('🚀 ~ ctx:', ctx)

      if (ctx.editor.isActive({ textAlign: 'center' })) {
        return 'center'
      }

      if (ctx.editor.isActive({ textAlign: 'right' })) {
        return 'right'
      }

      return 'left'
    },
  })

  return {
    current: currentAlignment,
    isActive: (alignment: Alignment): boolean => currentAlignment === alignment,
  }
}
