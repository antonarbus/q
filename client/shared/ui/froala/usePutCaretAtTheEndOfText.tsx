import type { RefAny, RefDiv } from 'client/shared/types'
import { useEffect } from 'react'

interface Props {
  index: number
  froalaElementRef: RefDiv
  editorRef: RefAny
}

export const usePutCaretAtTheEndOfText = ({
  index,
  editorRef,
  froalaElementRef,
}: Props): void => {
  useEffect(() => {
    const focusOnTextIfCellOrPaddingAreClicked = (e: MouseEvent): void => {
      // https://stackoverflow.com/a/35191761/7239778
      const clickedElement = e.target
      if (!(clickedElement instanceof HTMLElement)) return

      if (clickedElement.matches('.fr-box')) {
        editorRef.current.selection.setAtEnd(editorRef.current.$el.get(0))
      }

      if (clickedElement.matches('.ag-cell')) {
        // editorRef.current.selection.setAtStart(editorRef.current.$el.get(0))
        editorRef.current.selection.setAtEnd(editorRef.current.$el.get(0))
      }

      editorRef.current.selection.restore()
    };

    froalaElementRef.current.addEventListener('click', focusOnTextIfCellOrPaddingAreClicked)

  }, [index])
}
