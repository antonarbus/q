import { cls } from '@shared/consts/cls'
import { useEffectOnce } from 'react-use'

const showDraggableArea = (): void => {
  const droppableElements = document.querySelectorAll(`.${cls.droppable}`)
  droppableElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.outline = '2px dashed grey'
    }
  })

  const dropHereTextElements = document.querySelectorAll(`.${cls.dropHereText}`)
  dropHereTextElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.display = 'block'
    }
  })
}

export const hideDraggableArea = (): void => {
  const droppableElements = document.querySelectorAll(`.${cls.droppable}`)
  droppableElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.outline = ''
    }
  })

  const dropHereTextElements = document.querySelectorAll(`.${cls.dropHereText}`)
  dropHereTextElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.display = 'none'
    }
  })
}

export const usePreventImageToBeOpenedInBrowserOnDrop = (): void => {
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
