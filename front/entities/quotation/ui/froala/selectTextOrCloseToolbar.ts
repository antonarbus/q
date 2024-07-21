import type { MouseEvent } from 'react'
import type { FroalaEditorRef } from '@shared/types/froala'

type Props = {
  e: MouseEvent
  editorRef: FroalaEditorRef
}

export const selectTextOrCloseToolbar = ({ e, editorRef }: Props): void => {
  if (editorRef.current === null) return

  const clickedElement = e.target
  if (!(clickedElement instanceof HTMLElement)) return

  const isFrBox = clickedElement.matches('.fr-box')
  const isFroalaWrapper = clickedElement.matches('.froala-wrapper')
  const outsideEditableZone = isFrBox || isFroalaWrapper
  const insideEditableZone = !outsideEditableZone

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const toolbarElement = editorRef.current.$tb['0'] as HTMLElement
  const isToolbarOpened = toolbarElement.style.display === 'block'

  if (e.type === 'dblclick' && outsideEditableZone) return

  if (e.type === 'dblclick' && insideEditableZone) {
    setTimeout((): void => {
      if (editorRef.current === null) return
      const selectedText = editorRef.current.selection.text()
      if (selectedText.trim() === '') {
        editorRef.current.commands.selectAll()
      }
    })

    return
  }

  if (e.type === 'mousedown' && isToolbarOpened) {
    editorRef.current.toolbar.hide()
    e.stopPropagation()
    return
  }

  if (e.type === 'mousedown' && outsideEditableZone) {
    setTimeout((): void => {
      if (editorRef.current === null) return
      const selectedText = editorRef.current.selection.text()
      if (selectedText.trim() === '') {
        editorRef.current.commands.selectAll()
      }
    })
  }
}
