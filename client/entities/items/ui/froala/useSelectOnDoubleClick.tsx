import { useEffect } from 'react'
import { useFroala } from '../../providers/FroalaProvider'
import { useItem } from '../../providers/ItemProvider'

export const useSelectOnDoubleClick = (): void => {
  const { itemIndex } = useItem()
  const { editorRef, froalaElementRef } = useFroala()

  useEffect(() => {
    const selectOnDoubleClick = (e: MouseEvent): void => {
      if (editorRef.current === null) return

      const clickedElement = e.target
      if (!(clickedElement instanceof HTMLElement)) return

      setTimeout((): void => {
        if (editorRef.current === null) return

        // const toolbar = editorRef.current?.$tb?.['0']
        // if (!(toolbar instanceof HTMLElement)) return
        // const isToolbarVisible = toolbar.style.display === 'block'

        const selectedText = editorRef.current.selection.text()

        if (selectedText.trim() === '') {
          editorRef.current.commands.selectAll()
        }
      })
    }

    froalaElementRef.current?.addEventListener('dblclick', selectOnDoubleClick)

    return () => {
      froalaElementRef.current?.removeEventListener('dblclick', selectOnDoubleClick)
    }
  }, [itemIndex])
}
