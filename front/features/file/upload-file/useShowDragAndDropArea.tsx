import { useRef } from 'react'
import { useEffectOnce } from 'react-use'
import { hideDraggableArea, showDraggableArea } from './showDraggableArea'

export const useShowDragAndDropArea = (): void => {
  const dragCounter = useRef(0)

  useEffectOnce(() => {
    // Reset handler for cases when dragging is canceled without a drop
    const resetDragState = (): void => {
      dragCounter.current = 0
      hideDraggableArea()
    }

    document.addEventListener('dragover', (event) => {
      // to remove default green "plus" icon
      if (event.dataTransfer !== null) {
        event.dataTransfer.dropEffect = 'move'
      }

      // to avoid open image in browser
      event.preventDefault()
    })

    document.addEventListener('drop', (event) => {
      // to avoid open image in browser
      event.preventDefault()
      resetDragState()
    })

    // Reset counter when mouse leaves window or on escape key
    document.addEventListener('mouseleave', resetDragState)

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        resetDragState()
      }
    })

    document.addEventListener('dragenter', (): void => {
      dragCounter.current = dragCounter.current + 1

      if (dragCounter.current === 1) {
        showDraggableArea()
      }
    })

    document.addEventListener('dragleave', (): void => {
      dragCounter.current = dragCounter.current - 1

      if (dragCounter.current === 0) {
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
