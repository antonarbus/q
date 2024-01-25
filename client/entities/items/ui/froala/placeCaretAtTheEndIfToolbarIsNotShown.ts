import type FroalaEditor from 'froala-editor'
import { type RefObject, type MouseEvent, type MutableRefObject } from 'react'

type Props = {
  e: MouseEvent
  froalaElementRef: RefObject<HTMLDivElement>
  editorRef: MutableRefObject<FroalaEditor | null>
}

export const placeCaretAtTheEndIfToolbarIsNotShown = ({
  e,
  froalaElementRef,
  editorRef,
}: Props): void => {
  if (froalaElementRef.current === null) return
  if (!editorRef.current) return

  const toolbarElement = editorRef.current.$tb['0']
  const isToolbarOpened = toolbarElement.style.display === 'block'

  if (isToolbarOpened) return

  const clickedElement = e.target
  if (!(clickedElement instanceof HTMLElement)) return

  const isFrBox = clickedElement.matches('.fr-box')
  const isFroalaWrapper = clickedElement.matches('.froala-wrapper')

  if (isFrBox || isFroalaWrapper) {
    const contentEditableElement = editorRef.current.$el.get(0)
    if (!(contentEditableElement instanceof HTMLElement)) return
    editorRef.current.selection.setAtEnd(contentEditableElement)
  }

  editorRef.current.selection.restore()
}
