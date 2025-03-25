import { useEffectOnce } from 'react-use'
import { hideDraggableArea, showDraggableArea } from './showDraggableArea'
import { useRef } from 'react'

export const useOnDragOnDrop = (): void => {
  const dragCounter = useRef(0)

  useEffectOnce(() => {
    // Reset handler for cases when dragging is canceled without a drop
    const resetDragState = (): void => {
      dragCounter.current = 0
      hideDraggableArea()
    }

    document.addEventListener('dragover', (e) => {
      // to remove default green "plus" icon
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move'
      }

      // to avoid open image in browser
      e.preventDefault()
    })

    document.addEventListener('drop', (e) => {
      e.preventDefault() // to avoid open image in browser
      resetDragState()
    })

    // Reset counter when mouse leaves window or on escape key
    document.addEventListener('mouseleave', resetDragState)

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        resetDragState()
      }
    })

    document.addEventListener('dragenter', (e: DragEvent): void => {
      dragCounter.current++

      console.info('dragCounter:', dragCounter.current)

      if (dragCounter.current === 1) {
        console.info('dragenter')
        showDraggableArea()
      }
    })

    document.addEventListener('dragleave', (e: DragEvent): void => {
      dragCounter.current--

      console.info('dragCounter:', dragCounter.current)

      if (dragCounter.current === 0) {
        console.info('dragleave')
        hideDraggableArea()
      }
    })

    // Cleanup
    return (): void => {
      document.removeEventListener('mouseleave', resetDragState)
      document.removeEventListener('keydown', resetDragState)
    }
  })
}
