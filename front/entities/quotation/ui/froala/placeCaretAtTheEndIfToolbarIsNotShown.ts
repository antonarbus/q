import type { FroalaEditorRef } from '@shared/types/froala'

type Props = {
  e: React.MouseEvent
  froalaElementRef: React.RefObject<React.ComponentRef<'div'> | null>
  editorRef: FroalaEditorRef
}

export const placeCaretAtTheEndIfToolbarIsNotShown = ({
  e,
  froalaElementRef,
  editorRef,
}: Props): void => {
  if (froalaElementRef.current === null) {
    return
  }

  if (editorRef.current === null) {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const toolbarElement = editorRef.current.$tb['0'] as HTMLElement
  const isToolbarOpened = toolbarElement.style.display === 'block'

  if (isToolbarOpened === true) {
    return
  }

  const clickedElement = e.target

  if (clickedElement instanceof HTMLElement === false) {
    return
  }

  const isFrBox = clickedElement.matches('.fr-box')
  const isFroalaWrapper = clickedElement.matches('.froala-wrapper')

  const insideFroala = isFrBox || isFroalaWrapper

  if (insideFroala === true) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const contentEditableElement = editorRef.current.$el.get(0)

    if (contentEditableElement instanceof HTMLElement === false) {
      return
    }

    editorRef.current.selection.setAtEnd(contentEditableElement)

    //@ts-expect-error Froala does not provide types for this
    const isCaret = editorRef.current.selection.get().type === 'Caret'

    if (isCaret === true) {
      editorRef.current.selection.restore()
    }
  }
}
