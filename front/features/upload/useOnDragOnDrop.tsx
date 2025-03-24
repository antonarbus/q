import { useEffectOnce } from 'react-use'
import { hideDraggableArea, showDraggableArea } from './showDraggableArea'
import { useRef } from 'react'

export const useOnDragOnDrop = (): void => {
  const dragCounter = useRef(0)

  useEffectOnce(() => {
    document.addEventListener('dragover', (e) => {
      // to remove default green "plus" icon
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move'
      }

      // to avoid open image in browser
      e.preventDefault()
    })

    document.addEventListener('drop', (e) => {
      // to avoid open image in browser
      e.preventDefault()
      dragCounter.current = 0
      hideDraggableArea()
    })

    document.addEventListener('dragenter', (e: DragEvent): void => {
      dragCounter.current++

      if (dragCounter.current === 1) {
        console.info('dragenter')
        showDraggableArea()
      }
    })

    document.addEventListener('dragleave', (e: DragEvent): void => {
      dragCounter.current--

      if (dragCounter.current === 0) {
        console.info('dragleave')
        hideDraggableArea()
      }
    })
  })
}
