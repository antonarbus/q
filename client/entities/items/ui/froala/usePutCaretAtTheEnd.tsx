import { useEffect } from 'react'
import { useItem } from '../../providers/ItemProvider'
import { useFroala } from '../../providers/FroalaProvider'

export const usePutCaretAtTheEnd = (): void => {
  const { itemIndex } = useItem()
  const { editorRef, froalaElementRef } = useFroala()

  useEffect(() => {
    const focusOnTextIfCellOrPaddingAreClicked = (e: MouseEvent): void => {
      if (!editorRef.current) return
      // https://stackoverflow.com/a/35191761/7239778
      const clickedElement = e.target
      if (!(clickedElement instanceof HTMLElement)) return

      if (clickedElement.matches('.fr-box')) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        editorRef.current.selection.setAtEnd(editorRef.current.$el.get(0))
      }

      if (clickedElement.matches('.ag-cell')) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        editorRef.current.selection.setAtEnd(editorRef.current.$el.get(0))
      }

      editorRef.current.selection.restore()
    }

    froalaElementRef.current?.addEventListener('click', focusOnTextIfCellOrPaddingAreClicked)
  }, [itemIndex])
}
