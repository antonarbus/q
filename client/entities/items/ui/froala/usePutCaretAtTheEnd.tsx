import { useEffect } from 'react'
import { useFroala } from '../../providers/FroalaProvider'
import { useItem } from '../../providers/ItemProvider'

export const usePutCaretAtTheEnd = (): void => {
  const { itemIndex } = useItem()
  const { editorRef, froalaElementRef } = useFroala()

  useEffect(() => {
    const focusOnTextIfCellOrPaddingAreClicked = (e: MouseEvent): void => {
      if (froalaElementRef.current === null) return
      if (!editorRef.current) return

      const clickedElement = e.target
      if (!(clickedElement instanceof HTMLElement)) return

      if (clickedElement.matches('.fr-box')) {
        const contentEditableElement = editorRef.current.$el.get(0)
        if (!(contentEditableElement instanceof HTMLElement)) return
        editorRef.current.selection.setAtEnd(contentEditableElement)
      }

      editorRef.current.selection.restore()
    }

    froalaElementRef.current?.addEventListener('click', focusOnTextIfCellOrPaddingAreClicked)

    return () => {
      froalaElementRef.current?.removeEventListener('click', focusOnTextIfCellOrPaddingAreClicked)
    }
  }, [itemIndex])
}
