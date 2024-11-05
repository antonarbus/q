import { useEffectOnce } from 'react-use'
import { hideDraggableArea, showDraggableArea } from './showDraggableArea'

export const useOnDragOnDrop = (): void => {
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

      hideDraggableArea()
    })

    let draggedFile = false

    document.ondragenter = (e: DragEvent): void => {
      if (!draggedFile) {
        draggedFile = true
        showDraggableArea()
      }
    }

    document.ondragleave = (e: DragEvent): void => {
      //@ts-expect-error: some hack which I did not understand
      if (!e.fromElement && draggedFile) {
        draggedFile = false
        hideDraggableArea()
      }
    }
  })
}
