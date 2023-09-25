import type { MutableRefObject, RefObject } from 'react'
import { useEffect } from 'react'
import type FroalaEditor from 'froala-editor'

type Props = {
  itemIndex: number
  froalaElementRef: RefObject<HTMLDivElement>
  editorRef: MutableRefObject<FroalaEditor | null>
}

export const usePutCaretAtTheEndOfText = ({
  itemIndex,
  editorRef,
  froalaElementRef,
}: Props): void => {
  useEffect(() => {
    const focusOnTextIfCellOrPaddingAreClicked = (e: MouseEvent): void => {
      // https://stackoverflow.com/a/35191761/7239778
      const clickedElement = e.target
      if (!(clickedElement instanceof HTMLElement)) return
      if (!editorRef.current) return

      if (clickedElement.matches('.fr-box')) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        editorRef.current.selection.setAtEnd(editorRef.current.$el.get(0))
      }

      if (clickedElement.matches('.ag-cell')) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        editorRef.current.selection.setAtEnd(editorRef.current.$el.get(0))
      }

      editorRef.current.selection.restore()
    }

    froalaElementRef.current?.addEventListener('click', focusOnTextIfCellOrPaddingAreClicked)
  }, [itemIndex])
}
