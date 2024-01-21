import { useEffect } from 'react'
import { useFroala } from '../../providers/FroalaProvider'
import { useItem } from '../../providers/ItemProvider'

export const useSelectOnDoubleClick = (): void => {
  const { itemIndex } = useItem()
  const { editorRef, froalaElementRef } = useFroala()

  useEffect(() => {
    const selectOnDoubleClick = (e: MouseEvent): void => {
      if (!editorRef.current) return

      const clickedElement = e.target
      if (!(clickedElement instanceof HTMLElement)) return

      const clickedElementChildNodes = clickedElement.childNodes

      // if clicked a text node, no need to do anything manually coz selection works correctly by default
      const isTextNodeClicked = Array.from(clickedElementChildNodes).some(node => node.nodeType === Node.TEXT_NODE)

      if (isTextNodeClicked) return

      editorRef.current?.commands.selectAll()
    }

    froalaElementRef.current?.addEventListener('dblclick', selectOnDoubleClick)

    return () => {
      froalaElementRef.current?.removeEventListener('dblclick', selectOnDoubleClick)
    }
  }, [itemIndex])
}
