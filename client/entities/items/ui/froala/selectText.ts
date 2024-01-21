import type FroalaEditor from 'froala-editor'
import { type MouseEvent, type MutableRefObject } from 'react'

type Props = {
  e: MouseEvent
  editorRef: MutableRefObject<FroalaEditor | null>
}

export const selectText = ({
  e,
  editorRef,
}: Props): void => {
  if (editorRef.current === null) return

  const clickedElement = e.target
  if (!(clickedElement instanceof HTMLElement)) return

  setTimeout((): void => {
    if (editorRef.current === null) return
    const selectedText = editorRef.current.selection.text()
    if (selectedText.trim() === '') {
      editorRef.current.commands.selectAll()
    }
  })
}
