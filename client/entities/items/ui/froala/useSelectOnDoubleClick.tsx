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

      const toolbar = editorRef.current?.$tb?.['0']

      setTimeout(() => {
        if (!(toolbar instanceof HTMLElement)) return
        const toolbarDisplay = toolbar.style.display
        if (toolbarDisplay === 'none') {
          editorRef.current?.commands.selectAll()
        }
      })
    }

    froalaElementRef.current?.addEventListener('dblclick', selectOnDoubleClick)

    return () => {
      froalaElementRef.current?.removeEventListener('dblclick', selectOnDoubleClick)
    }
  }, [itemIndex])
}
