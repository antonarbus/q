import { RefAny, TRefDiv } from 'client/types'
import { useEffect } from 'react'

type Props = {
  index: number
  froalaElementRef: TRefDiv
  editorRef: RefAny
  isCopyMode: boolean
}

export const usePutCaretAtTheEndOfText = ({ index, isCopyMode, editorRef, froalaElementRef }: Props) => {
  useEffect(() => {
    if (isCopyMode) return
    function focusOnTextIfCellOrPaddingAreClicked(e: MouseEvent) {
      // https://stackoverflow.com/a/35191761/7239778
      const clickedElement = e.target as HTMLElement

      if (clickedElement.matches('.fr-box')) {
        editorRef.current.selection.setAtEnd(editorRef.current.$el.get(0))
      }

      if (clickedElement.matches('.ag-cell')) {
        // editorRef.current.selection.setAtStart(editorRef.current.$el.get(0))
        editorRef.current.selection.setAtEnd(editorRef.current.$el.get(0))
      }

      editorRef.current.selection.restore()
    }

    froalaElementRef?.current?.addEventListener('click', focusOnTextIfCellOrPaddingAreClicked)
    const tableCell = froalaElementRef?.current.closest('.ag-cell') as HTMLElement
    tableCell?.addEventListener('click', focusOnTextIfCellOrPaddingAreClicked)

    return () => {
      froalaElementRef?.current?.removeEventListener('click', focusOnTextIfCellOrPaddingAreClicked)
      tableCell?.removeEventListener('click', focusOnTextIfCellOrPaddingAreClicked)
    }
  }, [index, isCopyMode])
}
